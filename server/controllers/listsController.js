const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const FIELDS = "title _id boardId createdAt updatedAt";

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const listReq = {
      ...req.body.list,
      boardId: mongoose.Types.ObjectId(req.body.list.boardId)
    };
    List.create(listReq)
      .then((list) => {
        List.find({ _id: list._id }, FIELDS).then(
          (list) => res.json({ list })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating list failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createList = createList;