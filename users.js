const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./api/v1/models/User");
const axios = require("axios");

let users = {};
const db =
  "mongodb+srv://admin123:admin123@cluster0-jhik6.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(db, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Inserting New USers");

    axios.get("https://randomuser.me/api/?results=200").then(res => {
      // console.log(res.data.results);
      users = res.data.results;
      // console.log(users);

      for (let i = 0; i < users.length; i++) {
        // console.log(users[i]);
        let newUser = new User({
          name: users[i].login.username,
          email: users[i].email,
          profile_pic: users[i].picture.medium,
          password: users[i].login.password
        });
        newUser
          .save()
          .then(user => console.log({ user }))
          .catch(err => console.log(err));
      }
    });
  })
  .catch(err => console.log(err));
