import jobService from '../../../services/job';
import userService from '../../../services/user';

import User from '../../../models/user';

import readFileUploaded from '../../../services/util/file';

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

  userService.create(user)
    .then(() => res.status(201).location(`api/v1/user/${nickname}`).end())
    .catch(next);
}

function update(req, res, next) {
  const { id } = req.user;

  const upsertData = req.body;

  userService.update(id, upsertData)
    .then(() => res.status(204).end())
    .catch(next);
}

function remove(req, res, next) {
  const { nickname } = req.params;

  userService.findByNickname(nickname, 'jobAnnouncements')
    .then(({ jobAnnouncements }) => jobService.remove(jobAnnouncements))
    .then(() => userService.remove(nickname))
    .then(() => res.status(204).end())
    .catch(err => next(err));
}

function uploadResume(req, res, next) {
  const { id } = req.user;

  const { originalname, filename, mimetype } = req.file;
  const upsertData = {
    resume:  {
      name: originalname,
      file: {
        name: filename,
        mimeType: mimetype,
      }
    }
  };

  userService.update(id, upsertData)
    .then(() => res.status(204).end())
    .catch(next);
}

function findResume(req, res, next) {
  const { nickname } = req.params;

  userService.findByNickname(nickname, 'resume')
    .then(({ file }) => ({ file, document: readFileUploaded(file.name) }))
    .then(({ file, document }) => {
      res.setHeader('Content-Type', file.mimeType);
      document.pipe(res);
    })
    .catch(next);
}

export default {
  findAll,
  findByNickname,
  create,
  update,
  remove,
  uploadResume,
  findResume,
};
