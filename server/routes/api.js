const express = require ('express');
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const { validateBoard, validateList, validateUpdateList, validateCard, validateUpdateCard, validateComment } = require("../validators/validators");


router.get('/boards', boardsController.getBoards );

router.get('/boards/:id', boardsController.getBoardById );

router.post('/boards', validateBoard, boardsController.createBoard );

router.post('/lists', validateList, listsController.createList, boardsController.addListToBoard, listsController.listResponse );

router.put('/lists/:id', validateUpdateList, listsController.updateList, listsController.listResponse);

router.get('/cards/:id', cardsController.getCardById, cardsController.cardResponse);

router.post('/cards', validateCard, listsController.checkForList, cardsController.createCard, listsController.addCardToList, cardsController.cardResponse);

router.put('/cards/:id', validateUpdateCard, cardsController.updateCard, cardsController.cardResponse);

router.post('/comments', validateComment, cardsController.checkForCard, commentsController.createComment, cardsController.addComment, commentsController.commentResponse );

module.exports = router;