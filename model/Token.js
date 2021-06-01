const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    verificationToken: {
        type: String,
        trim: true,
        required: true,
    },
    pwdReset: {
        type: Boolean,
        default: false,
    },
    expireAt: {
        type: Date,
        default: Date.now(),
        expires: '30m',
    },
});

const Token = mongoose.model('Tokens', TokenSchema);

module.exports = Token;