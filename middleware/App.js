const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnnection = require("./database/mongo_connect");
const routes = require("./routes/routes");
const port = 3001;
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

dbConnnection.on("connected", () => {
  app.listen(port, () => {
    console.log(`Listening for API requests on ${port}!`);
  });
});
