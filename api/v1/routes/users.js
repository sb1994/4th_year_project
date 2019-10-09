const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/key");
const passport = require("passport");
//models
const User = require("../models/User");

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
router.post("/register", (req, res) => {
  const errors = {};
  console.log(res.body);

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json({ errors: errors });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          profile_pic:
            "https://ctvalleybrewing.com/wp-content/uploads/2017/04/avatar-placeholder.png",
          password: req.body.password
        });
        // console.log(newUser);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
            // console.log(newUser);
          });
        });
      }
    })
    .catch(err => console.log(err));
  // // console.log(req.body);
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  //find user by email
  User.findOne({
    email: email
  }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User Not Found" });
    }
    console.log(user.password);

    // check the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        //user matched create the payload taht will
        // be sent in the token
        const payload = {
          id: user.id,
          name: user.name,
          profile_pic: user.profile_pic
        };
        console.log(payload);

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
        // return res.status(200).json({ msg: "Login succes" });
      } else {
        return res.status(200).json({ msg: "password failed" });
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      profile_pic: req.user.profile_pic
    });
  }
);
module.exports = router;
