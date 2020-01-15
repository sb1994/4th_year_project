const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../models/Post");
const Comment = require("../models/Comment");

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

router.get("/", (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .populate("user")
    // .populate("comments")
    .populate({ path: "comments", populate: [{ path: "user" }] })
    // .populate({
    //   path: "comments"
    // })
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
      postImgURL: req.body.postImgURL,
      user: req.user._id
    });
    console.log(newPost);

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
    // .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

router.post(
  "/:id/comment/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.user._id);
    // console.log(req.body);
    let newComment = new Comment({
      text: req.body.text,
      user: req.user._id,
      post: req.params.id
    });

    newComment
      .save()
      .then(comment => {
        console.log(comment._id);
        Post.findOneAndUpdate(
          { _id: comment.post },
          { $push: { comments: comment._id } },
          { new: true, upsert: true }
        )
          .then(post => {
            Post.find({})
              .populate("user")
              .populate({ path: "comments", populate: [{ path: "user" }] })
              .then(post => {
                res.json(post);
              })
              .catch(err => {
                console.log(err);
              });
            // Post.find({})
            //   .sort({ date: -1 })
            //   .populate("user")
            //   // .populate("comments")
            //   .populate({ path: "comments", populate: [{ path: "user" }] })
            //   // .populate({
            //   //   path: "comments"
            //   // })
            //   .then(posts => res.json(posts))
            //   .catch(err =>
            //     res.status(404).json({ nopostsfound: "No posts found" })
            //   );
          })
          .catch(err => {
            console.log();
          });
      })
      .catch(err => {
        res.json(err);
      });
  }
);
module.exports = router;
