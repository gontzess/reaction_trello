const Board = require("../models/board");
const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const FIELDS = "title _id createdAt updatedAt";

const getBoards = (req, res, next) => {
  Board.find({}, FIELDS).then((boards) => {
    res.json({
      boards,
    });
  });
};

const getBoardById = (req, res, next) => {
  const id = req.params.id;
  Board.findById(id)
    .populate({
      path: 'lists',
      populate: {
        path: 'cards',
      }
    })
    .then((board) => {
      if (board === null) {
        next(new HttpError("Board not found", 404))
      } else {
        res.json({ board });
      }
    })
    .catch((err) =>
      next(new HttpError("Server errror, please try again", 500))
    );
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, FIELDS).then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoardById = getBoardById;