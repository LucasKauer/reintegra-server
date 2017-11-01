const messages = {
  request: {
    REQUEST_VALIDATION_ERROR: 'REQUEST_VALIDATION_ERROR',
  },
  mongo: {
    SCHEMA_VALIDATION_ERROR: 'DATABASE_SCHEMA_VALIDATION_ERROR',
    MESSAGE_MONGO_ERROR: 'O dado já existe.',
  },
  auth: {
    TOKEN_VALIDATION_ERROR: 'TOKEN_VALIDATION_ERROR',
    VERIFY_TOKEN_VALIDATION_ERROR: 'VERIFY_TOKEN_VALIDATION_ERROR',
    MESSAGE_VERIFY_TOKEN_ERROR: 'O token informado é inválido ou está expirado.',
  },
  default: {
    INTERNAL_ERROR: 'INTERNAL_SERVER_ERROR.',
    MESSAGE_INTERNAL_ERROR: 'Ocorreu um problema durante o processamento da sua requisição.',
  },
};

export default messages;
