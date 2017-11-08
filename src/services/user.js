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

function update(nickname, upsertData) {
  return new Promise((resolve, reject) => {
    const options = {
      upsert: true,
      runValidators: true,
    };

    User.update({ nickname }, upsertData, options, (err) => {
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

function addJobAnnouncement(id, job) {
  return new Promise((resolve, reject) => {
    User.update({ _id: id }, { $push: { jobAnnouncements: job } }, (err, user) => {
      if (err) reject(err);

      resolve(user);
    });
  });
}

function removeJobAnnouncements(id) {
  return new Promise((resolve, reject) => {
    User.update({ jobAnnouncements: id }, { $set: { jobAnnouncements: [] } }, (err, user) => {
      if (err) reject(err);

      resolve(user);
    });
  });
}

export default {
  findAll,
  findByNickname,
  create,
  update,
  remove,
  addJobAnnouncement,
  removeJobAnnouncements,
};
