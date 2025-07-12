import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  user: mongoose.Types.ObjectId;
  feedbackGiver: mongoose.Types.ObjectId;
  stars: number;
  comment?: string;
}

const FeedbackSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  feedbackGiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stars: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String },
});

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
