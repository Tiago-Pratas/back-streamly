const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minLength: 5},
    email: {type: String, required: true, unique: true, minLength: 6},
    password: {type: String, required: true, minLength: 8},
    id_provider: [ { type: mongoose.Types.ObjectId, ref: 'provider' } ],
    isActive: {type:Boolean, default: false, required: true},
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;