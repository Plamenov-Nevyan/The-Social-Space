import { UserProps } from "./types"
import { Socket } from "socket.io"
import express, { Express, Request } from "express"
import env from "./config/envConfig"
import { createServer} from "http"
import cors from "cors"
import routes from "./routes"
import expressConfig from "./config/express"
import mongoConfig from "./config/mongoDB"

const app: Express = express()
const http = createServer(app)
const socketIo = require("socket.io")(http, {
    cors : {
        origin : 'http://localhost:3000'
    }
})


let activeUsers: UserProps[] = []

expressConfig(app)
app.use(cors<Request>())
app.use(routes)

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
        console.log(data)
       activeUsers.push(data)
       socketIo.emit('sendListOfUsers', activeUsers)
    })
})



mongoConfig()
.then(() => http.listen(env.SERVER_PORT, () => {
    console.log(`Surver is running on port ${env.SERVER_PORT}...`)
 })  
)
.catch((err: Error) => console.log(err))