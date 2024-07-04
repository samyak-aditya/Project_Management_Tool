import { Schema, model } from 'mongoose';

const taskSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    typeOfPriority: {
      type: String,
      required: true,
    },
  },
  checklist: [
    {
      name: String,
      selected: {
        type: Boolean,
        default: false,
      },
    },
  ],
  dueDate: Date,
  status: {
    type: String,
    enum: ['todo', 'backlog', 'progress', 'done'],
    default: 'todo',
  },
  refUserId: {
    type: Schema.Types.ObjectId,
    required: false, // Set to true if assignment is mandatory
  },
}, { timestamps: true });

export default model('Task', taskSchema);
