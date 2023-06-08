import {Schema, model, Types, ObjectId} from "mongoose"
interface User {
    firstName: string,
    lastName: string;
    age: string;
    nickname : string;
    interests: string[];
    description : string;
    email: string;
    password: string;
    profilePicture: string;
    coverPicture: string;
    carouselPictures: object[]
}

const userSchema = new Schema<User>({
    firstName: {type : String, required : true},
    lastName: {type : String, required : true},
    age: {type : String, required : true},
    nickname :{type : String, required : true},
    interests: [],
    description : {type : String, required : true},
    email: {type : String, required : true},
    password: {type : String, required : true},
    profilePicture: {type: String, default: "https://drive.google.com/uc?export=view&id=1iMt8_whGlwVVfGofzNKVf7O9bwrNdjnt"},
    coverPicture: {type: String, default: "https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    carouselPictures: {type: []}
}, {timestamps: true})

const UserSchema = model<User>('UserSchema', userSchema)
export default UserSchema