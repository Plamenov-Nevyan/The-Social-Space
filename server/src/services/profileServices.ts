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

export const uploadCarouselPic = (userId:string, picture:FileProps, caption:string) => {
    uploadFile(picture)
    .then(async (resp: any) => {            // to fix type later ! 
        let imageLink = `https://drive.google.com/uc?export=view&id=${resp.data.id}`
        let user = await UserSchema.findById(userId)
        if(user instanceof UserSchema){
            user.carouselPictures.push({'src': imageLink, 'caption': caption})
            await user.save()
        }
    })
    .catch((err: Error) =>{ throw err})
}

export const getProfileData = async (userId: string) => {
    let user = await UserSchema.findById(userId)
  if(user instanceof UserSchema){
    return {
       firstName : user.firstName,
        lastName : user.lastName,
        nickname : user.nickname,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        carouselPictures : user.carouselPictures,
        description : user.description,
        interests : user.interests  
    }
  }
}

export const getNewCarouselPic = async (userId: string) => {
    let user = await UserSchema.findById(userId)
    if(user instanceof UserSchema) {
        return user.carouselPictures.slice(-1).pop()
    }
}