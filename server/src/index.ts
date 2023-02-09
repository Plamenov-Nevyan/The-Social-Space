import { UserProps } from "./types"
import { Socket } from "socket.io"
import express, { Express, Request } from "express"
import env from "./config/envConfig"
import { createServer} from "http"
import cors from "cors"

const app: Express = express()
const http = createServer(app)
const socketIo = require("socket.io")(http, {
    cors : {
        origin : 'http://localhost:3000'
    }
})


let activeUsers: UserProps[] = []

app.use(cors<Request>())

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

http.listen(env.SERVER_PORT, () => {
    console.log(`Surver is running on port ${env.SERVER_PORT}...`)
})  