import { UserProps } from "./types"
import { Socket } from "socket.io"
const app = require('express')()
const port = 8000
const http = require('http').Server(app)
const cors = require('cors')
const socketIo = require("socket.io")(http, {
    cors : {
        origin : 'http://localhost:3000'
    }
})

let activeUsers: UserProps[] = []

app.use(cors())

socketIo.on('connection', (socket: Socket) => {
    console.log(`${socket.id} has connected`)
    socket.on('message', (receivedData) => {
        socketIo.emit('messageResponse', receivedData)
    })
    socket.on('disconnect', () => {

        activeUsers = activeUsers.filter(user => user.socketId !== socket.id)
        socketIo.emit('sendListOfUsers', activeUsers)
        socket.disconnect()
    })
    socket.on('userSignUp',(data) => {
       activeUsers.push(data)
       socketIo.emit('sendListOfUsers', activeUsers)
    })
})

http.listen(port, () => {
    console.log(`Surver running on port ${port}...`)
})  