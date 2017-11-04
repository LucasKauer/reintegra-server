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
