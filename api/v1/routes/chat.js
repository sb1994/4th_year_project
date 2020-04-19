const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Message = require('../models/Message')

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }))
router.get('/get', (req, res) => {
  Message.find({ feedId: req.params.feed_id })
    .sort({ date: -1 })
    .populate('user')
    .then(chat => res.json(chat))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})
module.exports = router
