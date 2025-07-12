import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  location?: string;
  profile?: 'private' | 'public';
  profilePhoto?: string;
  availability: 'weekdays' | 'weekends';
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
}

const UserSchema: Schema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  location: {type: String},
  profile: {
    type: String,
    enum: ['private', 'public'],
    default: 'public',
  },
  profilePhoto: {type: String},
  availability: [
    {
      type: String,
      enum: ['weekdays', 'weekends'],
    },
  ],
  skillsOffered: [{type: String}],
  skillsWanted: [{type: String}],
  rating: {type: Number, default: 0, min: 0, max: 5},
});

export default mongoose.model<IUser>('User', UserSchema);
