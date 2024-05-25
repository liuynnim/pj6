const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { login_name } = req.body;
        const user = await User.findOne({ login_name });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login name' });
        }

        req.session.user = user;
        res.status(200).send({ userId: user._id, first_name: user.first_name });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal server error' });
        } else {
            res.status(200).send({ message: 'Signed out successfully' });
        }
    });
});

module.exports = router;