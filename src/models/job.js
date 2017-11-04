import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  company: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  creationDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  experience: {
    type: String,
  },
  industries: {
    type: Array,
  },
  employmentStatus: {
    type: String,
  },
  jobFunctions: {
    type: Array,
  },
}, { minimize: false });

export default mongoose.model('Job', jobSchema);
