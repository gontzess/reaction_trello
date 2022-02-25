const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'The Comment text is required']
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
    required: [true, 'CardId is required.']
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;