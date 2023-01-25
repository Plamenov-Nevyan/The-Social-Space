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
    // code here.. 
    socketIo.on('disconnect', () => {
        // code here..
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