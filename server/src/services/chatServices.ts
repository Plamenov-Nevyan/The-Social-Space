import { Types } from "mongoose";
import TranscriptSchema from "../Models/Transcript";
import { MessageProps, UnreadMsgList } from "../types";
import { UserProps } from "../types";

export const saveSentMessage = async (messageData: MessageProps) => {
    try{
        let communicationData = await TranscriptSchema.findOne({$or: [
            {userOne: messageData.sender, userTwo: messageData.receiver},
            {userOne: messageData.receiver, userTwo: messageData.sender}
        ]}).populate('transcript.receiver').populate('transcript.sender').exec()

        if(communicationData){
            communicationData?.transcript.push(messageData)
            await communicationData.save()
            return await TranscriptSchema.findById(communicationData._id).populate('transcript.receiver').populate('transcript.sender')
        }else{
         let newTranscript = await TranscriptSchema.create({userOne: messageData.sender, userTwo: messageData.receiver, transcript: [messageData]})
         return await TranscriptSchema.findById(newTranscript._id).populate('transcript.receiver').populate('transcript.sender')
        }
    }catch(err){
        throw new Error(err.message)
    }
}

export const getConvo = async (initiator: string, recipient: string) => {
try{
    let communicationData = await TranscriptSchema.find({$or: [
        {userOne: initiator, userTwo: recipient},
        {userOne: recipient, userTwo: initiator}
    ]}).populate('transcript.receiver').populate('transcript.sender')
    if(communicationData.length > 0){
        await markAsRead(initiator, communicationData[0]._id)
        return communicationData[0]
    }else {
        return {notExisting : true}
    }
 }catch(err){
    throw new Error(err.message)
 }
}

export const markAsRead = async (userId: string, commDataId: Types.ObjectId) => {
    try{
    let communicationData = await TranscriptSchema.findById(commDataId)
    communicationData?.transcript.forEach(message => {
        if(!message.read && message.receiver === userId){message.read = true}
    })
    await communicationData?.save()
  }catch(err){
    throw new Error(err.message)
  }
}

export const getUnreadCount = async (listOfActiveUsers: UserProps[], userId: string) => {
  let list: UnreadMsgList = {
    users : [],
    counts: []
  }
  for(let user of listOfActiveUsers){
    let transcriptDoc = await TranscriptSchema.findOne({$or: [
        {userOne: userId, userTwo: user.id},
        {userOne: user.id, userTwo: userId}
    ]})
    let unreadCount = 0
    transcriptDoc?.transcript.forEach(message => {
        if(message.receiver === userId && !message.read){unreadCount++}
    })
    if(unreadCount !== 0){
        list.users.push(user.id)
        list.counts.push(unreadCount)
    }
  }

  return list
}