import TranscriptSchema from "../Models/Transcript";
import { MessageProps } from "../types";

export const saveSentMessage = async (messageData: MessageProps) => {
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
}

export const getConvo = async (initiator: string, recipient: string) => {
    let communicationData = await TranscriptSchema.find({$or: [
        {userOne: initiator, userTwo: recipient},
        {userOne: recipient, userTwo: initiator}
    ]}).populate('transcript.receiver').populate('transcript.sender')
    return communicationData[0]
}