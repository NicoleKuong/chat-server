const express = require("express");
const cors = require("cors");
const SSE = require("json-sse");
const app = express();
const port = 4000;
const Message = require("./message/model");
const messageFactory = require("./message/router");
const channelFactory = require("./channel/router");

const middleware = cors();
app.use(middleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const stream = new SSE();

app.get("/stream", async (req, res, next) => {
  // prepare the data, next client connect then send it to the stream
  try {
    const messages = await Message.findAll();

    const action = {
      // in case there are different types of data from the client side
      type: "ALL_MESSAGES", //make an action object and send to the client
      payload: messages // return an array
    };

    const json = JSON.stringify(action); // turn the data into an array before send it to the stream
    stream.updateInit(json);

    stream.init(req, res);
  } catch (error) {
    next(error);
  }
});

const messageRouter = messageFactory(stream);
app.use(messageRouter);
const channelRouter = channelFactory(stream);
app.use(channelRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
