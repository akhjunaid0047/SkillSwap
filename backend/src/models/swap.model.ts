import mongoose, { Schema, Document } from 'mongoose';

export interface ISwap extends Document {
  requestor: mongoose.Types.ObjectId;
  acceptor: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: Date;
}

const SwapSchema: Schema = new Schema({
  requestor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  acceptor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISwap>('Swap', SwapSchema);
