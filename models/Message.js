const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema);