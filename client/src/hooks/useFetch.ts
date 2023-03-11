import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
const baseUrl = 'http://localhost:8000'

export function useFetch(){
  const [endpointToFetch, setEndpoint] = useState('')
  const [fetchOptions, setFetchOptions] = useState<object | undefined>({})
   const [response, setResponse] = useState({})
   const [error, setError] = useState('')
   const {setToStorage} = useLocalStorage()
   const setNewFetchData = (newEndpoint: string, options? : object) => {
    setFetchOptions(options)
    setEndpoint(newEndpoint)
  }
   useEffect(() => {
    if(endpointToFetch !== ''){
      fetch(baseUrl + endpointToFetch, fetchOptions)
     .then((resp) => resp.json())
     .then((data) => {
      setToStorage(data)
      setResponse({...data})
    })
     .catch(err => setError(err.message))
  }
   }, [endpointToFetch])
return {response, error, setNewFetchData}
}



// const fetchData = async (endpoint: string , options? : object) => {
//   try {
//   let resp = await fetch(baseUrl + endpoint, options)
//   if(resp.ok){
//      let data = await resp.json()
//      setToStorage({...data})
//      setResponse({...data})
//      console.log(response) // ===> {}
//    }else {
//     let receivedError = await resp.json()
//     throw new Error(receivedError.message)
//    }
//   }catch(err){
//    setError(err.message)
//    console.log(error) // ===> ''
//   }
// }