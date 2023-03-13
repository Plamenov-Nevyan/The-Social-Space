const baseUrl = 'http://localhost:8000/chat'
const endpoints = {
    send : '/send',
    get_last_convo: '/get-last/'
}

type MessageDataProps = {
    receiver : string,
    sender: string,
    message: string,
    createdAt: string,
    receiverSocketId: string;
}

export const sendMessage = async (messageData: MessageDataProps) => {
try{
    let resp = await fetch(baseUrl + endpoints.send, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(messageData)
       })
    let newCommDataOrErr = await resp.json()
  if(resp.ok){
    return newCommDataOrErr
  }else{
    throw newCommDataOrErr
  }
}catch(err){
    throw err
}
}

export const getLastConvo = async(userOneId: string, userTwoId: string) => {
  try {
    let resp = await fetch(baseUrl + endpoints.get_last_convo + userOneId + '/' + userTwoId)
    let commDataOrErr = await resp.json()
    if(resp.ok){
      return commDataOrErr
    }else{  
      throw commDataOrErr
    }
  }catch(err){
      throw err
  }
}