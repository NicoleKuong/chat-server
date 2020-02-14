const express = require("express");

const { Router } = express;
const Message = require("./model");

const router = new Router();

//Do not create get endpoint in the game project
router.get("/message", async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/message", async (req, res, next) => {
  try {
    const { body } = req;
    const { text } = body;
    const entity = { text };
    const message = await Message.create(entity);
    res.send(message);
    console.log("request.body test", message.dataValues);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
