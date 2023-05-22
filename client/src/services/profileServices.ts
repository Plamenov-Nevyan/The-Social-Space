const baseUrl = 'http://localhost:8000/profiles'
const endpoints = {
    my_profile : '/my-profile/',
}

export const uploadProfilePic = async (userId: string, picture: any) => {
   let formData = new FormData()
   formData.append('file', picture)
   await fetch(baseUrl + endpoints.my_profile + userId, {
    method: 'POST',
    body: formData
   })
}