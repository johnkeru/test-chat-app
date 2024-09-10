const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) next()
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        next()
    } catch (e) {
        console.log('Error hashing password: ', e.message)
        next(e)
    }
})

userSchema.methods.comparePassword = async function (password) {
    const user = this
    return await bcrypt.compare(password, user.password)
}

module.exports = mongoose.model('User', userSchema);