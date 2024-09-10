const { Server } = require('socket.io');
const Message = require('./models/Message')

module.exports = (server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        socket.on('create-room', ({ yourId, otherId }) => {
            const room = [yourId, otherId].sort().join('_')
            socket.join(room)
        })
        socket.on('message', async ({ yourId, otherId, message }) => {
            const room = [yourId, otherId].sort().join('_')
            const newMessage = new Message({ message, sender: yourId, receiver: otherId })
            await newMessage.save()
            io.to(room).emit('message', { newMessage })
        })
    })

    io.on('disconnect', () => {
        console.log('User disconnected');
    })
}