const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { login_name } = req.body;
        const user = await User.findOne({ login_name });
        if (!user) {
            return res.status(400).send({ error: 'Tên đăng nhập không hợp lệ' });
        }

        req.session.user = user;
        res.status(200).send({ userId: user._id, first_name: user.first_name });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Lỗi máy chủ nội bộ' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Lỗi máy chủ nội bộ' });
        } else {
            res.status(200).send({ message: 'Đăng xuất thành công' });
        }
    });
});

module.exports = router;