const { Router } = require("express");
const FactController = require("../controllers/fact.controller");
const RandomReqBlock = require("../middlewares/random-req-block");

const randomFactRouter = new Router();

randomFactRouter.get("/", RandomReqBlock, FactController.getRandomFact);

module.exports = randomFactRouter;
