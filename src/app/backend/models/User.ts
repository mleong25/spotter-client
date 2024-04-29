import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || '');
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    dob: Date,
    email: String,
    height: {
      ft: Number,
      in: Number,
    },
    weight: Number,
    role: {
      type: String,
      enum: ['user', 'client', 'athlete', 'coach'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
