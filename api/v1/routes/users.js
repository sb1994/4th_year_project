const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/key");
const passport = require("passport");
//models
const User = require("../models/User");

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

router.get("/", (req, res) => {
  User.find({})
    .select("-password")
    .then(users => {
      res.json({ users: users });
    })
    .catch(err => {});
});

router.post("/register", (req, res) => {
  const errors = {};
  //error - cannot deconstruct req.body so put whole value
  console.log(req.body);

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
              .then(user => res.json({ user: user }))
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

  // // //find user by email
  User.findOne({
    email: email
  })
    .populate("pendingFriendsRequests.user")
    .populate("friends.user")
    .then(user => {
      // if (!user) {
      //   return res.status(404).json({ email: "User Not Found" });
      // }
      // console.log(user);

      // //check the password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          //user matched create the payload taht will
          // be sent in the token
          const payload = {
            id: user.id,
            name: user.name,
            profile_pic: user.profile_pic,
            email: user.email,
            friends: user.friends,
            pendingFriendsRequests: user.pendingFriendsRequests
          };
          console.log(payload);

          // Sign Token
          console.log("keys");

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 * 1000 * 1000 * 20 },
            (err, token) => {
              res.json({
                success: true,
                token: `${token}`
              });
              console.log(token);
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
    // console.log(req.user);
    User.findById(req.user.id)
      .populate("pendingFriendsRequests.user")
      .populate("friends.user")
      .then(user => {
        const payload = {
          id: user.id,
          name: user.name,
          profile_pic: user.profile_pic,
          email: user.email,
          friends: user.friends,
          pendingFriendsRequests: user.pendingFriendsRequests
        };
        res.json(payload);
        console.log();
      })
      .catch(err => {
        console.log(err);
      });
    // res.json({
    //   user: {
    //     id: req.user.id,
    //     name: req.user.name,
    //     email: req.user.email,
    //     profile_pic: req.user.profile_pic
    //   }
    // });
  }
);
router.post(
  "/friends/add/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params.user_id);
    //id of the person sending the friend request
    let { _id } = req.user;
    console.log(`Requester Id : ${_id}`);

    let friendId = req.params.user_id;

    console.log(`Friends Id: ${friendId}`);

    User.findOneAndUpdate(
      {
        _id: friendId,
        //testing how to add and remove users from the request array
        "pendingFriendsRequests.user": { $ne: _id }
        // "pendingFriendsRequests.user": _id
      },
      // { $addToSet: { pendingFriendsRequests: { user: _id } } },
      {
        $addToSet: {
          pendingFriendsRequests: { user: _id, status: "requested" }
        }
      },
      // { $pull: { pendingFriendsRequests: { user: _id } } },

      err => {
        if (err) {
          console.log("Error:", err);
        } else {
          // User.findById(friendId)
          //   .select("-password")
          //   .populate("pendingFriendsRequests.user")
          //   .then(result => {
          //     res.send({ user: result });
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
          User.find({})
            .select("-password")
            .populate("friends.user")
            .populate("pendingFriendsRequests.user")
            .then(result => {
              res.send({ users: result });
            })
            .catch(err => {
              console.log(err);
            });
        }
        // process.exit(0);
      }
    );
  }
);

router.post(
  "/friends/accept/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params.user_id);
    //id of the person accepting the friend request
    let { _id } = req.user;

    console.log(`Reciver Id : ${_id}`);

    let requesterID = req.params.user_id;

    console.log(`Requester Id: ${requesterID}`);

    //current users pending/friends end then update the friend who requested
    User.findOneAndUpdate(
      {
        _id: _id,
        "friends.user": { $ne: requesterID }
      },
      {
        $pull: {
          pendingFriendsRequests: { user: requesterID }
        },
        $addToSet: {
          friends: { user: requesterID }
        }
      },

      err => {
        if (err) {
          console.log("Error:", err);
        } else {
          console.log("Updating ");
          User.findOneAndUpdate(
            {
              _id: requesterID,
              "friends.user": { $ne: _id }
            },
            {
              $addToSet: {
                friends: { user: _id }
              }
            },
            err => {
              if (err) {
                console.log(err);
              } else {
                User.findById(_id)
                  .select("-password")
                  .populate("pendingFriendsRequests.user")
                  .populate("friends.user")
                  .then(user => {
                    res.send({ user });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            }
          );
          // User.findById(friendId)
          //   .select("-password")
          //   .populate("pendingFriendsRequests.user")
          //   .then(result => {
          //     res.send({ user: result });
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
          // User.find({})
          //   .select("-password")
          //   .populate("friends.user")
          //   .populate("pendingFriendsRequests.user")
          //   .then(result => {
          //     res.send({ users: result });
          //     console.log(result.data);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
        }
        // process.exit(0);
      }
    );
  }
);
router.post(
  "/friends/cancel/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.params.user_id);
    //id of the person accepting the friend request
    let { _id } = req.user;

    console.log(`Reciver Id : ${_id}`);

    let requesterID = req.params.user_id;

    console.log(`Requester Id: ${requesterID}`);

    //current users pending/friends end then update the friend who requested
    User.findOneAndUpdate(
      {
        _id: _id,
        //testing how to add and remove users from the request array
        "pendingFriendsRequests.user": requesterID
      },
      // { $addToSet: { pendingFriendsRequests: { user: _id } } },
      // {
      {
        $pull: {
          pendingFriendsRequests: { user: requesterID }
        },
        $addToSet: {
          friends: { user: requesterID }
        }
      },
      //   $addToSet: {
      //     friends: { user: requesterID }
      //   }
      // },
      // { $pull: { pendingFriendsRequests: { user: requesterID } } },

      err => {
        if (err) {
          console.log("Error:", err);
        } else {
          console.log("Im Herre");

          // User.findById(friendId)
          //   .select("-password")
          //   .populate("pendingFriendsRequests.user")
          //   .then(result => {
          //     res.send({ user: result });
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
          // User.find({})
          //   .select("-password")
          //   .populate("friends.user")
          //   .populate("pendingFriendsRequests.user")
          //   .then(result => {
          //     res.send({ users: result });
          //     console.log(result.data);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
        }
        // process.exit(0);
      }
    );
  }
);
module.exports = router;
