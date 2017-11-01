import userService from '../../../services/user';
import User from '../../../models/user';

function findAll(req, res) {
  userService.findAll().then((users) => {
    if (!users || !users.length) {
      res.status(204).end();
    }

    res.status(200).json({ dados: users });
  });
}

function findByNickname(req, res) {
  const { nickname } = req.params;

  userService.findByNickname(nickname).then((user) => {
    if (!user) {
      res.status(204).end();
    }

    res.status(200).json({ dados: user });
  });
}

function create(req, res, next) {
  req.checkBody('nickname', 'O campo apelido é obrigatório').notEmpty();
  req.checkBody('password', 'O campo senha é obrigatório').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    /* eslint-disable no-throw-literal */
    throw { name: 'RequestValidationError', messages: errors.map(error => error.msg) };
  }

  const { nickname, password } = req.body;

  const user = new User({ nickname, password });

  userService.create(user).then(() => {
    res.status(201).location(`api/v1/user/${nickname}`).end();
  }).catch(next);
}

function remove(req, res) {
  const { nickname } = req.params;

  userService.remove(nickname).then(() => {
    res.status(204).end();
  });
}

export default {
  findAll,
  findByNickname,
  create,
  remove,
};