const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Connected to MongoDB');
    } catch (e) {
        console.log('Error connecting to MongoDB: ' + e.message);
    }
}