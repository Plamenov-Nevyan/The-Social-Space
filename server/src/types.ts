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

