import UserSchema from "../Models/User"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { UserProps } from "../types"
import env from "../config/envConfig"

const registerUser = async (userData : UserProps) => {
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

const createSession = (firstName: string, lastName: string, email: string, id: string) => {
    const payload = {
        firstName,
        lastName,
        email, 
        id
    }
    let accessToken = jsonwebtoken.sign(payload, env.JWT_SECRET)
    return {
        firstName,
        lastName,
        email, 
        id,
        accessToken
    }
}