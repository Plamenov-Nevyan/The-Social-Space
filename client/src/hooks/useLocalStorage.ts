import {useState} from "react";
import {UserProps} from "../types"
// type LocalStorageItems = {
//   session : {
//     firstName: string;
//     lastName: string;
//     age: string;
//     street: string;
//     city: string;
//     state: string;
//     ZIP: string;
//     email: string;
//     password: string;
//   }
// }

type GetStorageData = (key : string) => any
type GetAllStorageData = () => UserProps

export function useLocalStorage(){
  const [storedData, setStoredData] = useState(() => JSON.parse(localStorage.getItem('session') || '{}'))

 const setToStorage = (data:object): void => {
   localStorage.setItem("session", JSON.stringify({...data}))
   setStoredData({...data})
 }

 const replaceInStorage = (key: string, newData: any): void => {
  localStorage.setItem("session", JSON.stringify({...storedData, [key] : newData}))
   setStoredData((oldData: UserProps) => {return {...oldData, [key] : newData}})
 }

//  const removeFromStorage = (keyOrKeys) => {
//     console.log(keyOrKeys)
//    if (Array.isArray(keyOrKeys)){ 
//      setStoredData({...Object.fromEntries(Object.entries(storedData).filter(([currKey]) => keyOrKeys.includes(currKey) ))})
//    }else {
//     setStoredData({...Object.fromEntries(Object.entries(storedData).filter(([currKey]) => currKey !== keyOrKeys ))})
//    }
//    localStorage.setItem("session", JSON.stringify({...storedData}))
//  }

 const deleteSession = (): void => {
   localStorage.removeItem('session')
   setStoredData({})
 }

 const getFromStorage: GetStorageData = (key:string) => storedData[key]

 const getAllFromStorage: GetAllStorageData = () => storedData

 return {
    setToStorage,
   //  removeFromStorage,
    getFromStorage,
    deleteSession,
    getAllFromStorage,
    replaceInStorage
 }

}