import { Carousel } from "./Carousel/Carousel"
import { ChangeEvent, useState, useContext, useEffect } from "react"
import { SocketContext } from "../../../contexts/SocketContext"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import styles from "./myProfile.module.css"
import { uploadProfilePic } from "../../../services/profileServices"



export const MyProfile = () => {
    const {getAllFromStorage, replaceInStorage} = useLocalStorage()
    const userData = getAllFromStorage()
    // const [fileValue, setFileValue] = useState<File>()
    const socket = useContext(SocketContext)
    const onProfilePicSubmit = async (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(e.target.files instanceof FileList) {
            await uploadProfilePic(userData.id, e.target.files[0])
            socket.emit('getNewProfPicture', (userData.id))
        }
    }

    useEffect(() => {
     socket.on('receiveNewProfPic', (profPic) => {
        replaceInStorage('profilePicture', profPic)
        userData.profilePicture = profPic
     })
     console.log(userData)
    }, [socket])

    return (
        <div className={styles.container}>
            <div className={styles["cover-pic-container"]}>
                {/* <label htmlFor="upload-cover-pic-input" className={styles["upload-cover-label"]}>
                <span className={styles["upload-cover-pic"]}><i className="fas fa-image"></i></span>
                </label> */}
                <input type="file" id="upload-cover-pic-input" className={styles["upload-cover-pic-input-style"]}/>
                <img className={styles["cover-pic"]} src="https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
            </div>
               <div className={styles["profile-pic-container"]}>
               <img className={styles["profile-pic"]} src={userData.profilePicture}/>
               <label htmlFor="upload-prof-pic-input" className={styles["upload-prof-label"]}>
               <span className={styles["upload-prof-pic"]}><i className="fa-solid fa-camera"></i></span>
               </label>
               <input type="file" id="upload-prof-pic-input" onChange={(e) => onProfilePicSubmit(e)}/>
               </div>
               <div className={styles["descr-and-interests"]}>
                <h4>About me:</h4>
               <p className={styles["desr-para"]}>
                {userData.description}
               </p>
               <h4>I'm interested in:</h4>
               <ul>
                {
                    userData.interests.map((interest) => <li>
                        {interest}
                    </li>)
                }
               </ul>
               </div>
            <div className={styles["carousel-container"]}>
            <Carousel />
            <button className={styles["upload-carousel-img"]}>Upload picture <i className="fa-brands fa-firefox-browser"></i><input type="file" /></button>
            </div>
        </div>
    )
}