import mongoose from 'mongoose';

import encryptionService from '../services/util/encryption';

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordUpdatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  jobAnnouncements: {
    type: [mongoose.Schema.ObjectId],
  },
  cpf: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  name: {
    type: String,
  },
  rg: {
    type: String,
  },
  gender: {
    type: String,
    enum: [
      'M',
      'F',
      'O',
    ],
  },
  stateOfBirth: {
    type: String,
  },
  nationality: {
    type: String,
  },
  maritalStatus: {
    type: String,
    enum: [
      'MARRIED',
      'DIVORCED',
      'SEPARETED',
      'SINGLE',
      'WIDOWED',
    ],
  },
  cep: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  address: {
    type: String,
  },
  complement: {
    type: String,
  },
  number: {
    type: Number,
  },
  email: {
    type: String,
  },
  cellPhone: {
    type: String,
  },
  resume: {
    name: String,
    file: {
      name: String,
      mimeType: String,
    },
  },
}, { minimize: false });

userSchema.pre('save', function preSafe(next) {
  if (!this.isModified('password') && !this.isNew) next();

  encryptionService.encrypt(this.password)
    .then((hash) => {
      this.password = hash;
      this.passwordUpdatedAt = new Date();
      next();
    })
    .catch(err => next(err));
});

userSchema.methods.comparePassword = function comparePassword(password, callback) {
  encryptionService.compare(password, this.password)
    .then((equals) => {
      let error;
      callback(error, equals);
    })
    .catch(err => callback(err));
};

export default mongoose.model('User', userSchema);
