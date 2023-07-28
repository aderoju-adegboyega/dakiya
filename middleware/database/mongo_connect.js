const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://am350894:nZGz6JvsDTbg9jZ8@dakiya.jqyk9or.mongodb.net/dakiya",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Database credentials VALID");
  })
  .catch((err) => {
    console.log("Database credentials INVALID");
  });

const mongoConnection = mongoose.connection;

mongoConnection.on("error", (err) => {
  console.log("Unable to get mongo connection");
});

module.exports = mongoConnection;
