const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCardById = (req, res, next) => {
  const id = req.params.id;
  Card.findById(id)
    .populate({
      path: 'comments',
    })
    .populate({
      path: 'actions',
    })
    .then((card) => {
      if (card === null) {
        next(new HttpError("Card not found", 404))
      } else {
        res.locals.card = card;
        next();
      }
    })
    .catch((err) =>
      next(new HttpError("Server errror, please try again", 500))
    );
};

const createCard = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Card title is required", 422));
    return;
  }

  Card.create(res.locals.cardData)
    .then((card) => {
      res.locals.card = card;
      res.status(201);
      next();
    })
    .catch((err) =>
      next(new HttpError("Creating card failed, please try again", 500))
    );
};

const updateCard = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("At least one of the required fields was not provided", 422));
    return;
  }
  
  const id = req.params.id;
  
  Card.findByIdAndUpdate(id, req.body.card, {new: true})
    .then(card => {
      if (!card) {
        next(new HttpError("Card not found", 404));
      }
      res.locals.card = card;
      next();
    });
};

const checkForCard = (req, res, next) => {
  const cardId = req.body.cardId;
  Card.findById(cardId)
    .then(card => {
      if (card) {
        next();
      } else {
        next(new HttpError("List not found", 404));
      }
    })
    .catch(err => {
      next(new HttpError("Checking for card failed, please try again.", 500));
    });
};

const addComment = (req, res, next) => {
  const cardId = req.body.cardId;
  const commentId = res.locals.comment._id;
  
  Card.findByIdAndUpdate(
    cardId,
    {$push: {"comments": commentId}, $inc: {"commentsCount": 1}},
    {new: true})
    .then(() => {
      next();
    })
    .catch(err => {
      next(new HttpError("Adding comment failed, please try again.", 500));
    });
};

const cardResponse = (req, res, next) => {
  res.json(res.locals.card);
};


exports.getCardById = getCardById;
exports.createCard = createCard;
exports.cardResponse = cardResponse;
exports.checkForCard = checkForCard;
exports.addComment = addComment;
exports.updateCard = updateCard;