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
  if (!errors.isEmpty()) {
    next(new HttpError("Board title is required", 422));
    return;
  }

  Board.create(req.body.board)
    .then((board) => {
      Board.find({ _id: board._id }, FIELDS).then(
        (board) => res.json({ board })
      );
    })
    .catch((err) =>
      next(new HttpError("Creating board failed, please try again", 500))
    );
};

const addListToBoard = (req, res, next) => {
  const list = res.locals.list;

  Board.findByIdAndUpdate(list.boardId, {$push: {"lists": list._id}}, {new: true})
    .then(board => {
      if (board) {
        next();
      } else {
        List.findByIdAndDelete(list._id)
          .then(next(new HttpError("Board not found", 404)));
      }
    })
    .catch(err => {
      next(new HttpError("Adding list to board failed, please try again", 500));
    });
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoardById = getBoardById;
exports.addListToBoard = addListToBoard;