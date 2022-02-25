const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const { request } = require("express");
const FIELDS = "title _id boardId createdAt updatedAt";

const createList = (req, res, next) => {
  const errors = validationResult(req);
  const listReq = { ...req.body.list, boardId: req.body.boardId };
  if (!errors.isEmpty()) {
    next(new HttpError("The input field is empty.", 422));
    return;
  }

  List.create(listReq)
    .then((list) => {
      List.findById(list._id, FIELDS)
        .then(list => {
          if (!list) {
            throw new Error()
          }
          res.locals.list = list;
          next();
        });
    })
    .catch(err => {
      next(new HttpError("Creating list failed, please try again", 500));
    });
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Title or position is required.", 422));
    return;
  }
  
  const id = req.params.id;

  List.findByIdAndUpdate(id, req.body, {new: true})
    .then(list => {
      if (!list) {
        next(new HttpError("List not found", 404));
      }
      res.locals.list = list;
      next();
    })
    .catch(err => {
      next(new HttpError("Updating list failed, please try again", 500));
    });

};

const checkForList = (req, res, next) => {
  const listId = req.body.listId;
  List.findById(listId)
    .then(list => {
      if (list) {
        res.locals.cardData = { ...req.body.card, listId, boardId: list.boardId }
        next();
      } else {
        next(new HttpError("List not found", 404));
      }
    })
    .catch(err => {
      next(new HttpError("Adding card to list failed, please try again", 500));
    });
};

const addCardToList = (req, res, next) => {
  const { listId, _id: cardId } = res.locals.card;

  List.findByIdAndUpdate(listId, {$push: {"cards": cardId}}, {new: true})
    .then(() => {
      next();
    })
    .catch(err => {
      next(new HttpError("Adding card to list failed, please try again", 500));
    });
};

const listResponse = (req, res, next) => {
  res.json(res.locals.list);
};

exports.createList = createList;
exports.listResponse = listResponse;
exports.addCardToList = addCardToList;
exports.updateList = updateList;
exports.checkForList = checkForList;