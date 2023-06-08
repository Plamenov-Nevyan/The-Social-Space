import { CarouselPictureReplacements } from "../types"

const baseUrl = 'http://localhost:8000/profiles'
const endpoints = {
    my_profile : '/my-profile/',
    my_profile_carousel : '/my-profile/carousel/'
}

export const uploadProfilePic = async (userId: string, picture: any) => {
   let formData = new FormData()
   formData.append('file', picture)
   await fetch(baseUrl + endpoints.my_profile + userId, {
    method: 'POST',
    body: formData
   })
}

export const uploadCarouselPic = async (
    userId:string, picture:any, caption:string) => {
    let formData = new FormData()
    formData.append('file', picture)
    formData.append('caption', caption)
    console.log(`formData`)
    await fetch(baseUrl + endpoints.my_profile_carousel + userId, {
     method: 'POST',
     body: formData
    })
}

