const baseUrl = 'http://localhost:8000'
const endpoints = {
    register: '/register',
    login: '/login'
}

export const registerUser = async (userData: object) => {
  try{
  let resp = await fetch(baseUrl + endpoints.register, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(userData)
  })
  let newUserOrErr = await resp.json()
  if(resp.ok){
    return newUserOrErr
  }else{
    throw newUserOrErr
  }
}catch(err){
  throw(err)
}
} 

export const loginUser = async (userData: object) => {
  try{
  let resp = await fetch(baseUrl + endpoints.login, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(userData)
  })
  let loggedUserOrErr = await resp.json()
  if(resp.ok){
    return loggedUserOrErr
  }else{
    throw loggedUserOrErr
  }
}catch(err){
  throw(err)
}
} 