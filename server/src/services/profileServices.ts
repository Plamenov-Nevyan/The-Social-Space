import UserSchema from "../Models/User";
import { Response } from "express";
import { FileProps } from "../types";
const uploadFile = require('../utils/googleUpload')

export const uploadProfilePic = (userId: string, picture: FileProps) => {
    uploadFile(picture)
    .then(async (resp: any) => {            // to fix type later ! 
        let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
        let user = await UserSchema.findById(userId)
        if(user instanceof UserSchema){
            user.profilePicture = imageLink
            await user.save()
        }
    })
    .catch((err: Error) =>{ throw err})
}

export const getNewProfPicture = async (userId: string) => {
    let user = await UserSchema.findById(userId)
    if(user instanceof UserSchema){
        return user.profilePicture
    }
}