const app = require('express')()
const port = 8000
const http = require('http').Server(app)
const cors = require('cors')
const socketIo = require("socket.io")(http, {
    cors : {
        origin : 'http://localhost:3000'
    }
})

let activeUsers = []

app.use(cors())

socketIo.on('connection', (socket) => {
    console.log(`${socket.id} has connected`)
    socket.on('message', (receivedData) => {
        socketIo.emit('messageResponse', receivedData)
    })
    socketIo.on('disconnect', () => {
        activeUsers = activeUsers.filter(user => user.socketId !== socket.id)
        socket.emit('sendListOfUsers', activeUsers)
        socket.disconnect()
    })
    socket.on('userSignUp',(data) => {
       activeUsers.push(data)
       socket.emit('sendListOfUsers', activeUsers)
    })
})

app.get('/', (req, res) => {
    res.json({
        message : "Hello world"
    })
})

http.listen(port, () => {
    console.log(`Surver running on port ${port}...`)
})