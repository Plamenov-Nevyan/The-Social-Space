export type UserProps = {
    nickname: string,
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    accessToken: string;
    profilePicture: string,
    coverPicture: string,
    carouselPictures: CarouselPicture[],
    description: string,
    interests: string[],
    socketId : string;
  }
  type UserPropsForChatBody = {
      firstName: string,
      lastName: string;
      age: string;
      nickname : string;
      interests: string[];
      description : string;
      email: string;
      _id: string
    }
 export  type UnreadMsgList = {
    users : string[],
    counts: number[]
  }
  
  export type UnreadTransformedList = {
    [key: string] : number
  }

  export type MessageDataProps = {
    receiver : UserProps,
    sender: UserProps,
    message: string,
    createdAt: string,
  }
 
  type MessageDataPropsForChatBody = {
    receiver : UserPropsForChatBody,
    sender: UserPropsForChatBody,
    message: string,
    createdAt: string,
  }
  export type CommsDataProps = {
    userOne: string,
    userTwo: string,
    transcript: MessageDataPropsForChatBody[] | []
  }

  export type CarouselPicture = {
    src: string,
    caption: string,
  }

  export type CarouselPictureReplacements = {
    carouselPictures : CarouselPicture[]
  }

  export type ProfileDataProps = {
    firstName: string,
    lastName: string,
    nickname: string,
    profilePicture: string,
    coverPicture: string,
    carouselPictures: CarouselPicture[] | []
    description: string,
    interests: string[] | []
  }