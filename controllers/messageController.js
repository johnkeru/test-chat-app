const Message = require('../models/Message')
const User = require('../models/User')

exports.chats = async (req, res) => {
    try {
        const { yourId, otherId } = req.query
        let messages = []
        if (yourId && otherId) {
            messages = await Message.find({
                $or: [
                    { sender: yourId, receiver: otherId },
                    { sender: otherId, receiver: yourId }
                ]
            })
        }

        const user = req.session.user
        const users = await User.find({ _id: { $ne: user._id } })
        const otherPerson = await User.findById(otherId)
        res.render('chats', { user, users, messages, otherPerson })
    } catch (e) {
        console.error('Error fetching messages:', e.message);
        // Redirect to the base URL if fetching messages fails
        res.redirect('/chats');
    }
}
