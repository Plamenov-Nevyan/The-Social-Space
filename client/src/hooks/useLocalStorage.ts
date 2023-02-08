import {useState} from "react";
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

export function useLocalStorage(){
  const [storedData, setStoredData] = useState(() => JSON.parse(localStorage.getItem('session') || '{}'))

 const setToStorage = (data:object) => {
   localStorage.setItem("session", JSON.stringify({...data}))
   setStoredData({...data})
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

 const deleteSession = () => {
   localStorage.removeItem('session')
   setStoredData({})
 }

 const getFromStorage = (key:string) => storedData[key]


 return {
    setToStorage,
   //  removeFromStorage,
    getFromStorage,
    deleteSession
 }

}