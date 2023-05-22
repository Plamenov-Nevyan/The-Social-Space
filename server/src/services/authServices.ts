import UserSchema from "../Models/User"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { UserProps, UserPropsLogin } from "../types"
import env from "../config/envConfig"
import { Types } from "mongoose"

export const registerUser = async (userData : UserProps) => {
   let isUserExisting = await checkIfUserExists(userData.email)
   if(!isUserExisting){
    try{
    let hash = await bcryptjs.hash(userData.password, env.SALT_ROUNDS)
    userData.password = hash
    return UserSchema.create({
        ...userData
    })
     }catch(err){
        throw new Error(err.message)
     }
   }else {
    throw new Error('Email is not available!')
   }
}

const checkIfUserExists = (email:string) => UserSchema.exists({email}).exec() 

export const loginUser = async (userData: UserPropsLogin) => {
    let user = await UserSchema.findOne({email: userData.email})
    if(user){
        let isPassCorrect = await bcryptjs.compare(userData.password, user?.password)
        if(isPassCorrect){
            let session = createSession(user.nickname, user.firstName, user.lastName, user.email, user._id, user.profilePicture)
            return session
        }else {
            throw new Error('Email and/or password is incorrect!')
        }
    }else {
        throw new Error('Email and/or password is incorrect!')
    }
}

export const createSession = (nickname: string, firstName: string, lastName: string, email: string, id: Types.ObjectId, profilePicture:string) => {
    const payload = {
        nickname,
        firstName,
        lastName,
        email, 
        id
    }
    let accessToken = jsonwebtoken.sign(payload, env.JWT_SECRET)
    return {
        nickname,
        firstName,
        lastName,
        email, 
        id,
        accessToken
    }
}
