import { ObjectId } from "mongoose";

export type UserProps = {
  firstName: string;
  lastName: string;
  age: string;
  nickname : string;
  interests: string[];
  description : string;
  socketId: string;
  id: string;
} & UserPropsLogin

export type UserPropsLogin = {
  email : string;
  password: string
}

export type MessageProps = {
  receiver : string,
  sender: string,
  message: string,
  createdAt: string,
  receiverSocketId: string;
  senderSocketId: string;
  read: boolean
}

export type UnreadMsgList = {
  users : string[],
  counts: number[]
}

export type usersData = {
  userId : string,
  selectedUserId: string
}

export type FileProps = {
  fieldname : string,
  originalname : string,
  encoding : string,
  mimetype : string,
  buffer: Buffer,
  size : number
} 