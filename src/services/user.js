import User from '../models/user';

const projection = '-_id -__v -password';

function findAll() {
  return new Promise((resolve, reject) => {
    User.find({}, projection, (err, users) => {
      if (err) return reject(err);

      return resolve(users);
    });
  });
}

function findByNickname(nickname) {
  return new Promise((resolve, reject) => {
    User.findOne({ nickname }, projection, (err, user) => {
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
