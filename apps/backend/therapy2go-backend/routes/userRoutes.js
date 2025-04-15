const express = require('express')
const User = require('../models/user')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const {jsonWebToken, generateRefreshToken, verifyRefreshToken} = require('../utils/JSONWebToken');

router.post('/register', asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        error(`user already exists with email: ${email} and password: ${password}`);
        throw new Error('user already exists');
    }
    const user = await User.create({
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: jsonWebToken(user._id)
        })
    } else {
        res.status(400)
        error(`invalid user with email: ${email} and password: ${password} for registration`);
        throw new Error('invalid user with email and password for registration');
    }
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            token: jsonWebToken(user._id)
        })
    } else {
        res.status(401)
        error(`invalid user with email: ${email} and password: ${password} for login`);
        throw new Error('invalid email or password for login')
    }
}));

// Refresh an access token using a valid refresh token
router.post('/token/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    const result = verifyRefreshToken(refreshToken);

    if (!result.success) {
        return res.status(403).json({ error: result.error });
    }

    const user = result.data;
    const newAccessToken = generateRefreshToken(user);
    res.json({ accessToken: newAccessToken });
});


module.exports = router

