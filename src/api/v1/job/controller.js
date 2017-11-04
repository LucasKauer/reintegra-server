import jobService from '../../../services/job';
import userService from '../../../services/user';

import Job from '../../../models/job';

function findAll(req, res) {
  jobService.findAll().then((jobs) => {
    if (!jobs || !jobs.length) {
      res.status(204).end();
    }

    res.status(200).json({ dados: jobs });
  });
}

function findByTitle(req, res) {
  const { title } = req.params;

  jobService.findByTitle(title).then((jobs) => {
    if (!jobs || !jobs.length) {
      res.status(204).end();
    }

    res.status(200).json({ dados: jobs });
  });
}

function create(req, res, next) {
  req.checkBody('title', 'O campo título é obrigatório').notEmpty();
  req.checkBody('company', 'O campo empresa é obrigatório').notEmpty();
  req.checkBody('city', 'O campo cidade é obrigatório').notEmpty();
  req.checkBody('state', 'O campo estado é obrigatório').notEmpty();
  req.checkBody('country', 'O campo país é obrigatório').notEmpty();
  req.checkBody('description', 'O campo descrição é obrigatório').notEmpty();
  req.checkBody('experience', 'O campo experiência é obrigatório').notEmpty();
  req.checkBody('industries', 'O campo setor é obrigatório').notEmpty();
  req.checkBody('employmentStatus', 'O campo tipo de emprego é obrigatório').notEmpty();
  req.checkBody('jobFunctions', 'O campo funcões de trabalho é obrigatório').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    /* eslint-disable no-throw-literal */
    throw { name: 'RequestValidationError', messages: errors.map(error => error.msg) };
  }

  const {
    title,
    company,
    city,
    state,
    country,
    description,
    experience,
    industries,
    employmentStatus,
    jobFunctions,
  } = req.body;

  const job = new Job({
    title,
    company,
    city,
    state,
    country,
    description,
    experience,
    industries,
    employmentStatus,
    jobFunctions,
  });

  const { id } = req.user;

  jobService.create(job)
    /* eslint-disable no-underscore-dangle */
    .then(() => userService.addJobAnnouncement(id, job._id))
    .then(() => res.status(201).location(`api/v1/job/${job._id}`).end())
    .catch(next);
}

function remove(req, res, next) {
  const { id } = req.params;

  userService.removeJobAnnouncements(id)
    .then(() => jobService.remove(id))
    .then(() => res.status(204).end())
    .catch(next);
}

export default {
  findAll,
  findByTitle,
  create,
  remove,
};
