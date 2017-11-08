import messages from './const/error';

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  if (err.name === 'MongoError' || err.name === 'ValidationError') {
    const errors = [{
      codigo: messages.mongo.SCHEMA_VALIDATION_ERROR,
      mensagem: err.message,
    }];

    return res.status(400).json({ errors });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    const errors = [{
      codigo: messages.auth.VERIFY_TOKEN_VALIDATION_ERROR,
      mensagem: messages.auth.MESSAGE_VERIFY_TOKEN_ERROR,
    }];

    return res.status(401).json({ errors });
  }

  if (err.name === 'InternalValidationError') {
    const errors = err.messages.map(e => ({
      codigo: e.code,
      mensagem: e.message,
    }));

    return res.status(400).json({ errors });
  }

  if (err.name === 'RequestValidationError') {
    const errors = err.messages.map(e => ({
      codigo: messages.request.REQUEST_VALIDATION_ERROR,
      mensagem: e,
    }));

    return res.status(400).json({ errors });
  }

  if (err.name === 'UnauthorizedError') {
    const errors = [{
      codigo: messages.auth.TOKEN_VALIDATION_ERROR,
      mensagem: err.message,
    }];

    return res.status(401).json({ errors });
  }

  return res.status(500).json({
    errors: [{
      message: messages.default.MESSAGE_INTERNAL_ERROR,
      error: messages.default.INTERNAL_ERROR,
    }],
  });
}

export default errorHandler;
