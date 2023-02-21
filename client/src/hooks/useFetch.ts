import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
const baseUrl = 'http://localhost:8000'

export function useFetch(endpoint: string, options? : object){
   const [response, setResponse] = useState({})
   const [error, setError] = useState('')
   const {setToStorage} = useLocalStorage()

   const fetchData = async (endpoint: string , options? : object) => {
    try {
    let resp = await fetch(baseUrl + endpoint, options)
    if(resp.ok){
       let data = await resp.json()
       setToStorage({...data})
       setResponse(data)
     }else {
      let receivedError = await resp.json()
      throw new Error(receivedError.message)
     }
    }catch(err){
     setError(err.message)
     console.log(error)
    }
  }
return {response, error, fetchData}
}
