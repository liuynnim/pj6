const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {
  
});

router.get("/", async (request, response) => {
  console.log(request.session.user);
  if (request.session.user) {
    try {
        const users = await User.find({}, '_id first_name last_name'); 
        response.json(users);
    } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
    } 
  } else {
    response.status(401).send('Unauthorized');
  }
});

router.get("/:id", async (request, response) => {
    try {
        const userId = request.params.id;
        const user = await User.findById(userId);
    
        if (!user) {
          return response.status(404).json({ message: "User not found." });
        }
    
        response.json({
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          location: user.location,
          description: user.description,
          occupation: user.occupation
        });
      } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
      }
});
module.exports = router;