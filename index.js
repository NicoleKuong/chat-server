const express = require("express");
// const cors = require("cors");
const app = express();
const port = 4000;
const messageRouter = require("./message/router");

// const middleware = cors();
// app.use(middleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);
app.use(messageRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
