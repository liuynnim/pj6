const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
const multer = require("multer");
const router = express.Router();

router.post("/", async (request, response) => {
});

router.get("/:id", async (request, response) => {
    if (request.session.user) {
        const userId = request.params.id;
        try {
            const photos = await Photo.find({ user_id: userId });
            const photosWithComments = await Promise.all(photos.map(async (photo) => {
                const commentsWithUserInfo = await Promise.all(photo.comments.map(async (comment) => {
                    const user = await User.findById(comment.user_id, '_id first_name last_name');
                    return {
                        _id: comment._id,
                        comment: comment.comment,
                        date_time: comment.date_time,
                        user: {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name
                        }
                    };
                }));
            
                return {
                    _id: photo._id,
                    file_name: photo.file_name,
                    date_time: photo.date_time,
                    user_id: photo.user_id,
                    comments: commentsWithUserInfo
                };
            }));
            response.json(photosWithComments);
        } catch (err) {
            console.error(err);
            response.status(500).send('Server Error');
        }
    } else {
        response.status(401).send('Unauthorized');
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

router.post("/:id/new",upload.single("photo"), async(req, res) => {
  try {
    const newPhoto = new Photo({
        file_name:  req.file.filename,
        user_id: req.params.id,
        date_time: new Date()
    });

    const savedPhoto = await newPhoto.save();

    res.status(200).send(savedPhoto);
  } catch (error) {
      console.log("Error uploading photo:", error);
      res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
