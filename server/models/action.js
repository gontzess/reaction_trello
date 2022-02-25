const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: {
    type: String,
    required: [true, 'The description is required']
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
    required: [true, 'CardId is required.']
  },
}, { timestamps: true });

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;