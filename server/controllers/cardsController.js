const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const { request } = require("express");

const getCardById = (req, res, next) => {
  const id = req.params.id;
  Card.findById(id)
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

const cardResponse = (req, res, next) => {
  res.json(res.locals.card);
};

exports.getCardById = getCardById;
exports.createCard = createCard;
exports.cardResponse = cardResponse;