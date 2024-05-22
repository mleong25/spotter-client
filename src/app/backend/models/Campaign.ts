import mongoose, { Schema } from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || '');
mongoose.Promise = global.Promise;

const campaignSchema = new Schema(
  {
    goal: {
      type: String,
      enum: ['strength', 'cut', 'maintain', 'bulk', 'recomp'],
    },
    duration: {
      type: Number,
      min: 1,
    },
    daysTrain: {
      type: Number,
      min: 1,
      max: 7,
    },
    split: {
      type: String,
      enum: [
        'cardio',
        'ppl',
        'upper_lower',
        'body_part',
        'full_body',
        'powerlift',
        'custom',
      ],
    },
    exercises: {
      type: Array,
      default: [],
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startDate: Date,
  },
  {
    timestamps: true,
  }
);

const Campaign =
  mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);

export default Campaign;
