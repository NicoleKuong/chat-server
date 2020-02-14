const express = require("express");
// const cors = require("cors");
const app = express();
const port = 4000;
// const Event = require("./event/model");
// const eventRouter = require("./event/router");
// const bodyParser = require("body-parser");

// const middleware = cors();
// app.use(middleware);

// const parserMiddleware = bodyParser.json();
// app.use(parserMiddleware);

// app.use(eventRouter);
// app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
