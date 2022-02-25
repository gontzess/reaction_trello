const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: String,
  labels: [
    {
      type: String
    }
  ],
  listId: { type: Schema.Types.ObjectId, ref: 'List' },
  position: Number,
  archived: { type: Boolean, default: false },
  dueDate: Date,
  completed: { type: Boolean, default: false },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  comments: [Schema.Types.Mixed],
  commentsCount: { type: Number, default: 0 },
  actions: [Schema.Types.Mixed]
}, { timestamps: true });

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;