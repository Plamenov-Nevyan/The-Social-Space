const app = require('express')()
const port = 8000
const http = require('http').Server(app)
const cors = require('cors')
const socketIo = require("socket.io")(http, {
    cors : {
        origin : 'http://localhost:3000'
    }
})

app.use(cors())

socketIo.on('connection', (socket) => {
    console.log(`${socket.id} has connected`)
    socket.on('message', (receivedData) => {
        socketIo.emit('messageResponse', receivedData)
    })
    socketIo.on('disconnect', () => {
        console.log(`${socket.id} has disconnected`)
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