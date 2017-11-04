import Job from '../models/job';

const defaultProjection = '-__v';

function findAll() {
  return new Promise((resolve, reject) => {
    Job.find({}, defaultProjection, (err, jobs) => {
      if (err) return reject(err);

      return resolve(jobs);
    });
  });
}

function findByTitle(title, projection) {
  return new Promise((resolve, reject) => {
    const proj = projection === '' ? projection : projection || defaultProjection;
    Job.find({ title }, proj, (err, jobs) => {
      if (err) return reject(err);

      return resolve(jobs);
    });
  });
}

function create(job) {
  return new Promise((resolve, reject) => {
    Job.create(job, (err) => {
      if (err) return reject(err);

      return resolve();
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    Job.remove({ _id: id }, (err) => {
      if (err) return reject(err);

      return resolve();
    });
  });
}

export default {
  findAll,
  findByTitle,
  create,
  remove,
};
