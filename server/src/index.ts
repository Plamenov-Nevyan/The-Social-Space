import {saveSentMessage, getUnreadCount, markAsRead} from "./services/chatServices"
import { getNewProfPicture } from "./services/profileServices"
import { UserProps, MessageProps } from "./types"
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
    socket.on('disconnect', () => {

        activeUsers = activeUsers.filter(user => user.socketId !== socket.id)
        socketIo.emit('sendListOfUsers', activeUsers)
        socket.disconnect()
    })
    socket.on('userSignUp',(data) => {
       activeUsers.push(data)
       console.log(activeUsers)
       socketIo.emit('sendListOfUsers', activeUsers)
    })
    socket.on('saveMessage', async (messageData: MessageProps) => {
        try{
        let receiverSocket = messageData.receiverSocketId
        let senderSocketId = messageData.senderSocketId
        Reflect.deleteProperty(messageData, 'receiverSocketId')
        Reflect.deleteProperty(messageData, 'senderSocketId')
        let commData = await saveSentMessage(messageData)
        
        socketIo.to(senderSocketId).emit('updateCommData', commData)
        socket.to(receiverSocket).emit('message', [commData, messageData.sender])
        }catch(err){
         socketIo.to(socket.id).emit('messageError', {message: 'Message was not sent successfully!'})
        }
    })
    socket.on('getUnreadCount', async (userId: string) => {
       let list = await getUnreadCount(activeUsers, userId)
       socketIo.to(socket.id).emit('saveUnreadCount', (list))
    })
    socket.on('markAsRead', async (usersData) => {
       await markAsRead(usersData)
    })
    socket.on('getNewProfPicture', async (userId: string) => {
      let newProfPic = await getNewProfPicture(userId)
      socketIo.to(socket.id).emit('receiveNewProfPicture', (newProfPic))
    })
    socket.on('iAmTyping', (recipientSocketId: string) => {
        socketIo.to(recipientSocketId).emit('userIsTyping')
    })
    socket.on('iStoppedTyping', (recipientSocketId: string) => {
        socketIo.to(recipientSocketId).emit('userStoppedTyping')
    })
})



mongoConfig()
.then(() => http.listen(env.SERVER_PORT, () => {
    console.log(`Surver is running on port ${env.SERVER_PORT}...`)
 })  
)
.catch((err: Error) => console.log(err))