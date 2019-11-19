const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
// const keys = require("./config/key");

const cors = require("cors");
dotenv.config();

const app = express();

// const db = process.env.DB_CONNECT || "mongodb://localhost:27017/socialweb";
// const db = "mongodb://localhost:27017/socialweb";
const db =
  "mongodb+srv://admin123:admin123@cluster0-jhik6.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
const users = require("./api/v1/routes/users");
const posts = require("./api/v1/routes/posts");
app.use(passport.initialize());
require("./config/passport")(passport);
//parse for the jsnon data that will be passed to the frontend clients
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/users", users);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
