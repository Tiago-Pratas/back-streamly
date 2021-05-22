const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const providerSchema = new Schema({
    name: {type: String, required: true},
    apId: {type: String, required: true},
    logo: {type: String, required: true},
}, {
    timestamps: true,
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

