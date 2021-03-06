const express = require("express");

const Message = require("./model");

function factory(stream) {
  const { Router } = express;
  const router = new Router();
  // const stream = new SSE(); // a list of client
  //SSE a request that doesn't end, keep getting request and response
  //get on the stream

  //Do not create get endpoint in the game project
  // router.get("/message", async (req, res, next) => {
  //   try {
  //     const messages = await Message.findAll();
  //     res.send(messages);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  router.post("/message", async (req, res, next) => {
    try {
      const { body } = req;
      const { text } = body;
      const entity = { text };
      const message = await Message.create(entity);

      const action = {
        type: "ONE_MESSAGE",
        payload: message
      }; // return an object

      const json = JSON.stringify(action); //serialize the data

      stream.send(json);
      res.send(message);
      console.log("request.body test", message.dataValues);
    } catch (error) {
      next(error);
    }
  });
  return router;
}

module.exports = factory;
