import bcrypt from 'bcrypt-nodejs';

const rounds = 2;
function createHash(value, salt) {
  let progress;
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, salt, progress, (err, hash) => {
      if (err) reject(err);

      resolve(hash);
    });
  });
}

function encrypt(value) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, salt) => {
      if (err) reject(err);

      createHash(value, salt).then((hash) => {
        resolve(hash);
      }).catch((error) => {
        reject(error);
      });
    });
  });
}

function compare(value, encrypted) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, encrypted, (err, equals) => {
      if (err) reject(err);

      resolve(equals);
    });
  });
}

export default {
  encrypt,
  compare,
};
