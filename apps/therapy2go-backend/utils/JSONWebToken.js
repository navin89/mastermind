const jwt = require('jsonwebtoken');

// Generate a new refresh token
function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
    };

    const secret = '';
    const options = {
        expiresIn: '6d',
    }

    return jwt.sign(payload, secret, options);
}

// Verify a refresh token
function verifyRefreshToken(token) {
    const secret = 'your-refresh-token-secret';

    try {
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


const jsonWebToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '23h'
    })
}

module.exports = {
    jsonWebToken,
    verifyRefreshToken,
    generateRefreshToken
}