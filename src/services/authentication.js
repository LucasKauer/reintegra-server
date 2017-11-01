import jwt from 'jsonwebtoken';

const secondsInHour = 3600;

function calculateExpirationTime(tokenDuration) {
  return tokenDuration * secondsInHour;
}

function createToken({ _id }) {
  const { SECURITY_SECRET, TOKEN_DURATION } = process.env;

  const tokenUser = {
    id: _id,
  };

  const tokenConfig = {
    expiresIn: calculateExpirationTime(TOKEN_DURATION),
  };

  return jwt.sign(tokenUser, SECURITY_SECRET, tokenConfig);
}

function verifyToken(token) {
  const { SECURITY_SECRET } = process.env;

  if (!token) {
    /* eslint-disable no-throw-literal */
    throw { name: 'UnauthorizedError', message: 'Informe o token de acesso.' };
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, SECURITY_SECRET, (err, decoded) => {
      if (err) reject(err);

      resolve(decoded);
    });
  });
}

export default {
  createToken,
  verifyToken,
};
