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


//  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]

// {
//   "_id": 9,
//   "title": "My new card",
//   "description": "",
//   "labels": [],
//   "listId": 13,              // references list ObjectID
//   "position": 65535.0,       // ADD
//   "archived": false,
//   "createdAt": "2020-10-08T17:54:55.285Z",
//   "updatedAt": "2020-10-08T17:54:55.285Z",
//   "dueDate": null,
//   "completed": false,
//   "boardId": 1,              // references board ObjectID
//   "comments": [],            // ADD
//   "actions": [],             // ADD
//   "commentsCount": 0         // ADD
// }