const Comment = require("../models/comment");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Comment text is required", 422));
    return;
  }

  Comment.create({cardId: req.body.cardId, text: req.body.comment.text})
    .then((comment) => {
      res.locals.comment = comment;
      res.status(201);
      next();
    })
    .catch((err) => {
      next(new HttpError("Creating comment failed, please try again", 500))
      return;
    });
};

const commentResponse = (req, res, next) => {
  res.json(res.locals.comment);
};


exports.createComment = createComment;
exports.commentResponse = commentResponse;
