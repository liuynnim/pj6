const express = require("express");
const router = express.Router();
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

router.post('/:photo_id', async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).send({ error: 'Comment is required' });
    }

    const photo = await Photo.findById(req.params.photo_id);
    if (!photo) {
      return res.status(404).send({ error: 'Photo not found' });
    }

    const user = req.session.user;
    if (!user) {
      return res.status(401).send({ error: 'User not logged in' });
    }

    const newComment = {
      comment: comment,
      date_time: new Date(),
      user_id: user._id
    };

    photo.comments.push(newComment);
    await photo.save();

    res.status(200).send(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;