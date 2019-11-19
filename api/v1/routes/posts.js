const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../models/Post");

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .populate("user")
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);

    const newPost = new Post({
      text: req.body.text,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      user: req.user._id
    });
    // console.log(newPost);

    newPost.save().then(post => res.json(post));
  }
);
// router.get("/:id", (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => {
//       if (post) {
//         res.json(post);
//       } else {
//         res.status(404).json({ nopostfound: "No post found with that ID" });
//       }
//     })
//     .catch(err =>
//       res.status(404).json({ nopostfound: "No post found with that ID" })
//     );
// });
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});
module.exports = router;
