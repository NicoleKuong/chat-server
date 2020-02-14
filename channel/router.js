const express = require("express");

const Channel = require("./model");

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

  router.post("/channel", async (req, res, next) => {
    try {
      const { body } = req;
      const { name } = body;
      const entity = { name };
      const channel = await Channel.create(entity);

      const action = {
        type: "ONE_CHANNEL",
        payload: channel
      }; // return an object

      const json = JSON.stringify(action); //serialize the data

      stream.send(json);
      res.send(channel);
      console.log("request.body test", channel.dataValues);
    } catch (error) {
      next(error);
    }
  });
  return router;
}

module.exports = factory;
