const express = require("express");
const SSE = require("json-sse");
const { Router } = express;
const Message = require("./model");

const router = new Router();
const stream = new SSE(); // a list of client
//SSE a request that doesn't end, keep getting request and response
//get on the stream

router.get("/stream", async (req, res, next) => {
  // prepare the data, next client connect then send it to the stream
  try {
    const messages = await Message.findAll();
    const json = JSON.stringify(messages); // turn the data into an array before send it to the stream
    stream.updateInit(json);

    stream.init(req, res);
  } catch (error) {
    next(error);
  }
});
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
