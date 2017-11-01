import User from '../models/user';

const defaultProjection = '-_id -__v -password';

function findAll() {
  return new Promise((resolve, reject) => {
    User.find({}, defaultProjection, (err, users) => {
      if (err) return reject(err);

      return resolve(users);
    });
  });
}

function findByNickname(nickname, projection) {
  return new Promise((resolve, reject) => {
    const proj = projection === '' ? projection : projection || defaultProjection;
    User.findOne({ nickname }, proj, (err, user) => {
      if (err) return reject(err);

      return resolve(user);
    });
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    User.create(user, (err) => {
      if (err) return reject(err);

      return resolve();
    });
  });
}

function remove(nickname) {
  return new Promise((resolve, reject) => {
    User.remove({ nickname }, (err) => {
      if (err) return reject(err);

      return resolve();
    });
  });
}

export default {
  findAll,
  findByNickname,
  create,
  remove,
};
