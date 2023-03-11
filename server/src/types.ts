import { ObjectId } from "mongoose";

export type UserProps = {
  firstName: string;
  lastName: string;
  age: string;
  nickname : string;
  interests: string[];
  description : string;
  socketId : string;
} & UserPropsLogin

export type UserPropsLogin = {
  email : string;
  password: string
}

export type MessageProps = {
  receiver : ObjectId,
  sender: ObjectId,
  message: string,
  createdAt: string,
}

