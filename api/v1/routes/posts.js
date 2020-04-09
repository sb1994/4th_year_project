const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Post = require('../models/Post')
const Comment = require('../models/Comment')

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }))

router.get('/', (req, res) => {
  Post.find({})
    .sort({ date: -1 })
    .populate('user')
    // .populate("comments")
    .populate({ path: 'comments', populate: [{ path: 'user' }] })
    // .populate({
    //   path: "comments"
    // })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body)

    const newPost = new Post({
      text: req.body.text,
      postImgURL: req.body.postImgURL,
      user: req.user._id,
      feedId: req.body.feedId
    })
    // console.log(newPost);

    newPost.save().then(post => res.json(post))
  }
)
router.delete(
  '/:id/:feed_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { id, feed_id } = req.params
    let feedId = feed_id
    let { user } = req
    console.log(id, feed_id)

    Post.findById(id).then(post => {
      // Check for post owner
      if (post.feedId.toString() !== user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' })
      }

      // Delete
      post
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
    })
  }
)
router.post(
  '/:id/comment',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('hello')

    // // console.log(req.user._id);
    // // console.log(req.body);
    let newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      post: req.params.id
    })

    console.log(newComment)

    // res.json({ newComment })

    newComment
      .save()
      .then(comment => {
        // console.log(comment._id);
        Post.findOneAndUpdate(
          { _id: comment.post },
          { $push: { comments: comment._id } },
          { new: true, upsert: true }
        )
          .then(post => {
            Post.find({ feedId: post.feedId })
              .sort({ created: -1 })
              .populate('user')
              .populate({ path: 'comments', populate: [{ path: 'user' }] })
              .then(post => {
                res.json(post)
              })
              .catch(err => {
                console.log(err)
              })
              // Post.find({})
              //   .sort({ date: -1 })
              .populate('user')
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
            console.log()
          })
      })
      .catch(err => {
        res.json(err)
      })
  }
)
router.post(
  '/:id/comment/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let { id, comment_id } = req.params
    // let feedId = feed_id
    let { user } = req
    // console.log(id, comment_id)

    Post.findOneAndUpdate({ _id: id }, { $pull: { comments: comment_id } })
      .then(post => {
        Post.find({ feedId: post.feedId })
          .populate('user')
          .populate({ path: 'comments', populate: [{ path: 'user' }] })
          .then(post => {
            res.json(post)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log()
      })
  }
)

router.get('/feed/:feed_id', (req, res) => {
  Post.find({ feedId: req.params.feed_id })
    .sort({ created: -1 })
    .populate('user')
    // .populate("comments")
    .populate({ path: 'comments', populate: [{ path: 'user' }] })
    // .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})

module.exports = router
