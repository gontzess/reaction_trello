const {check, oneOf} = require('express-validator');

const hasOneOf = fields => {
  const checks = fields.map(field => check(field).not().isEmpty());
  return [oneOf(checks)];
}

exports.validateBoard = [check("board.title").not().isEmpty()];
exports.validateList = [check("list.title").not().isEmpty()];
exports.validateUpdateList = hasOneOf([
  "title",
  "position"
]);
exports.validateCard = [check("card.title").not().isEmpty()];
exports.validateUpdateCard = hasOneOf([
  "card.title",
  "card.listId",
  "card.position",
  "card.description",
  "card.archived",
  "card.dueDate",
  "card.completed",
  "card.labels"
]);