import io from 'socket.io-client'

const socket = io()

// Create a URL object for the current page URL
const urlObject = new URL(window.location.href);
const params = new URLSearchParams(urlObject.search);
const yourId = params.get('yourId');
const otherId = params.get('otherId');
if (yourId && otherId) {
    socket.emit('create-room', { yourId, otherId })
}

function autoScrollDown() {
    if (otherId) {
        document.querySelector('.chat-messages').scroll({
            top: document.querySelector('.chat-messages').scrollHeight,
            behavior: 'smooth'
        });
    }
}

autoScrollDown()

socket.on('message', ({ newMessage }) => {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message ${newMessage.sender === yourId ? 'your-message' : 'other-message'}`;
    const messageContent = `
        <p>${newMessage.message}</p>
    `;
    // Insert the content into the message container
    messageContainer.innerHTML = messageContent;
    // Append the message to the chat or message display area
    document.querySelector('.chat-messages').appendChild(messageContainer);
    autoScrollDown()
});



if (otherId) {
    document.getElementById('send').addEventListener('click', (e) => {
        e.preventDefault()
        const message = document.getElementById('message').value
        socket.emit('message', { yourId, otherId, message })
        document.getElementById('message').value = '';
        autoScrollDown()
    })
}
