import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
const baseUrl = 'http://localhost:8000'

export function useFetch(endpoint: string, options? : object){
   const [endpointUrl, setEndpointUrl] = useState(endpoint)
   const [fetchOptions, setFetchOptions] = useState(options)
   const [response, setResponse] = useState({})
   const [error, setError] = useState('')
   const {setToStorage} = useLocalStorage()

  useEffect(() => {
    const fetchData = async (endpoint: string, options? : object) => {
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
      }
    }
    fetchData(endpointUrl, fetchOptions)
  }, [endpointUrl, fetchOptions])

  const triggerFetch = (newEndpoint: string, newFetchOptions?: object) => {
    setEndpointUrl(newEndpoint)
    setFetchOptions(() => {return {...newFetchOptions}})
  }
return {response, error, triggerFetch}
}
