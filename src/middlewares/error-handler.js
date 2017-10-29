import messages from './const/error';

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(400).json({
      error: {
        codigo: messages.mongo.SCHEMA_VALIDATION_ERROR,
        mensagem: messages.mongo.MESSAGE_MONGO_ERROR,
      },
    });
  }

  if (err.name === 'RequestValidationError') {
    const errors = err.messages.map(e => ({
      codigo: messages.request.REQUEST_VALIDATION_ERROR,
      mensagem: e,
    }));

    return res.status(400).json({ errors });
  }

  return res.status(500).json({
    errors: [{
      message: messages.default.MESSAGE_INTERNAL_ERROR,
      error: messages.default.INTERNAL_ERROR,
    }],
  });
}

export default errorHandler;
