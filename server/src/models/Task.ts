import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

export default model<ITask>('Task', TaskSchema);