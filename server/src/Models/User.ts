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
    profilePicture: {type: String, default: "https://drive.google.com/uc?export=view&id=1iMt8_whGlwVVfGofzNKVf7O9bwrNdjnt"}
}, {timestamps: true})

const UserSchema = model<User>('UserSchema', userSchema)
export default UserSchema