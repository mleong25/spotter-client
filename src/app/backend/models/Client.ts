import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || '');
mongoose.Promise = global.Promise;

const clientSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    dob: Date,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.models.Client || mongoose.model('Client', clientSchema);

export default Client;
