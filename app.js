/* *** app imports *** */

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/phonebookRoute");

require("dotenv").config();

/* *** app middleware *** */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

// if (process.env.NODE_ENV === "development") {
//     app.use(cors({origin: `http://localhost:3000`}));
// }

/* *** app routs *** */
app.use("/api", apiRouter);
require("./DB/index");
app.get("/", (req, res) => res.send("Hello World!"));
const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`),
);
module.exports = app;
