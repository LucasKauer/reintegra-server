import userService from '../../../services/user';
import authenticationService from '../../../services/authentication';
import User from '../../../models/user';

function verifyToken(req, res, next) {
  const token = req.get('authorization');

  authenticationService.verifyToken(token)
    .then(() => res.status(200).json({ dados: { token } }))
    .catch(next);
}

function login(req, res, next) {
  req.checkBody('nickname', 'O campo apelido é obrigatório').notEmpty();
  req.checkBody('password', 'O campo senha é obrigatório').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    /* eslint-disable no-throw-literal */
    throw { name: 'RequestValidationError', messages: errors.map(error => error.msg) };
  }

  const { nickname, password } = req.body;
  const user = new User({ nickname, password });

  const validatePassword = userFound =>
    (resolve, reject) =>
      (err, match) => {
        if (err) reject(err);
        if (!match) {
          /* eslint-disable prefer-promise-reject-errors */
          reject({
            name: 'ValidationError',
            messages: [{
              code: 'INCORRECT_PASSWORD',
              message: 'A senha não corresponde a do usuário.',
            }],
          });
        }

        resolve(userFound);
      };

  const comparePassword = userFound =>
  /* eslint-disable no-unused-vars */
    new Promise((resolve, reject) => {
      if (!userFound) {
        throw {
          name: 'ValidationError',
          messages: [{
            code: 'USER_NOT_FOUND',
            message: 'O usuário não foi encontrado.',
          }],
        };
      }
      return userFound.comparePassword(user.password, validatePassword(userFound)(resolve, reject));
    });

  const createToken = userFound => authenticationService.createToken(userFound);

  userService.findByNickname(nickname, '-__v')
    .then(comparePassword)
    .then(createToken)
    .then(token => res.status(200).json({ dados: { token } }))
    .catch(next);
}

export default {
  verifyToken,
  login,
};
