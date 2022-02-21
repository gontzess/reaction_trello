const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const { request } = require("express");
const FIELDS = "title _id boardId createdAt updatedAt";

const createList = (req, res, next) => {
  const errors = validationResult(req);
  const listReq = { ...req.body.list, boardId: req.body.boardId };
  if (!errors.isEmpty()) {
    return next(new HttpError("The input field is empty.", 422));
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
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Title or position is required.", 422));
  }
  
  const listUpdates = Object.assign(
    {},
    req.body.title === undefined ? null : {title: req.body.title},
    req.body.position === undefined ? null : {position: req.body.position}
  );

  List.findByIdAndUpdate(id, listUpdates, {new: true})
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

const listResponse = (req, res, next) => {
  res.json(res.locals.list);
};

exports.createList = createList;
exports.listResponse = listResponse;
exports.updateList = updateList;