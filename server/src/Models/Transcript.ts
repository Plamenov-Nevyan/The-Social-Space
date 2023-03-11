import {Schema, model, Types, ObjectId} from "mongoose"
import { MessageProps } from "../types"

interface Transcript {
  userOne : {
    type: ObjectId,
  },
  userTwo : {
    type: ObjectId,
  }
  transcript : MessageProps[]
}

const transcriptSchema = new Schema<Transcript>({
   userOne : {
    type: Types.ObjectId,
    ref: 'UserSchema'
   },
   userTwo : {
    type: Types.ObjectId,
    ref: 'UserSchema'
   },
   transcript: [
    {
     receiver : {type: Types.ObjectId, ref: 'UserSchema'},
     sender : {type: Types.ObjectId, ref: 'UserSchema'},
     message: {type: String},
     createdAt: {type: String}
    }
   ]
})

const TranscriptSchema = model<Transcript>('TranscriptSchema', transcriptSchema)
export default TranscriptSchema