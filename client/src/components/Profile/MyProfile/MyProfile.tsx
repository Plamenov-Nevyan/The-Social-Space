import { Carousel } from "./Carousel/Carousel"
import React, { ChangeEvent, useState, useContext, useEffect, FormEvent, MouseEvent } from "react"
import { SocketContext } from "../../../contexts/SocketContext"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import styles from "./myProfile.module.css"
import { uploadProfilePic, uploadCarouselPic } from "../../../services/profileServices"
import { CarouselPicture, ProfileDataProps } from "../../../types"


export const MyProfile = () => {
    const {getFromStorage} = useLocalStorage()
    const [profileData, setProfileData] = useState<ProfileDataProps>({
        firstName: '',
        lastName: '',
        nickname: '',
        profilePicture: '',
        coverPicture: '',
        carouselPictures: [],
        description: '',
        interests: []
      })
    const [profPicFileValue, setProfPicFileValue] = useState<File>()
    const [carouselFileValue, setFileValue] = useState<File>()
    const [carouselCaption, setCarouselCaption] = useState<string>('')
    const socket = useContext(SocketContext)
 useEffect(() => {
    socket.emit('getProfileData', (getFromStorage('id')))
 }, [])

 useEffect(() => {
    socket.on('receiveProfileData', (data: ProfileDataProps) => {
        setProfileData(() => {return {...data}})
    })
 })
    const onProfilePicSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(profPicFileValue instanceof File) {
            await uploadProfilePic(getFromStorage('id'), profPicFileValue)
            socket.emit('getNewProfPicture', (getFromStorage('id')))
            setProfPicFileValue(undefined)
        }
    }

    const onCarouselPicSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(carouselFileValue instanceof File) {
            await uploadCarouselPic(getFromStorage('id'), carouselFileValue, carouselCaption)
            socket.emit('getNewCarouselPicture', (getFromStorage('id')))
        }
    }

    const onCarouselPicChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files instanceof FileList) {
        setFileValue(e.target.files[0])
        }
        console.log(carouselFileValue)
    }

    const onCarouselCaptionChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCarouselCaption(e.target.value)
        console.log(carouselCaption)
    }

    useEffect(() => {
     socket.on('receiveNewProfPicture', (profPic) => {         // STATE DOESN"T UPDATE WHEN NEW PICTURE ARRIVES...
        console.log(profPic)                                   //
       setProfileData((oldData) => {
        return {...oldData, profilePicture: profPic}
       })
     })
    }, [socket])

    useEffect(() => {
        socket.on('receiveNewCarouselPic', (picture: CarouselPicture) => {
            console.log(picture)
            setProfileData((oldData) => {return {
                ...oldData, 
                carouselPictures : [...oldData.carouselPictures, picture]
            }
          })
        })
    }, [socket])
  
    const onProfPicSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files instanceof FileList){
            setProfPicFileValue(e.target.files[0])
        }
    }
    

    const onProfPicDeselect = () => {
        setProfPicFileValue(undefined)
    }

    return (
        <div className={styles.container}>
                <div className={styles["cover-pic-container"]} style={{
                    backgroundImage : `url(${profileData.coverPicture})`
                }}>
                    {/* <label htmlFor="upload-cover-pic-input" className={styles["upload-cover-label"]}>
                    <span className={styles["upload-cover-pic"]}><i className="fas fa-image"></i></span>
                    </label> */}
                    <input type="file" id="upload-cover-pic-input" className={styles["upload-cover-pic-input-style"]}/>
                </div>
               <div className={styles["profile-pic-container"]}>
                    <img className={styles["profile-pic"]} src={profileData.profilePicture}/>
                    { profPicFileValue === undefined    
                        ?  <>
                                <label htmlFor="upload-prof-pic-input" className={styles["upload-prof-label"]}>
                                    <span className={styles["upload-prof-pic"]}><i className="fa-solid fa-camera"></i></span>
                                </label>
                                <input type="file" id="upload-prof-pic-input" onChange={(e) => onProfPicSelect(e)}/>
                            </>
                        : <div className={styles["confirm-prof-container"]}>
                            <p>Update profile picture ?</p>
                            <button className={styles["confirm-btn"]} onClick={(e) => onProfilePicSubmit(e)}>
                                 <i className="fa-solid fa-check"></i>
                            </button>
                            <button className={styles["confirm-btn"]} onClick={() => onProfPicDeselect()}>
                                <i className="fa-light fa-rectangle-xmark"></i>
                            </button>
                        </div>
                    }
                  
               </div>
               <div className={styles["descr-and-interests"]}>
                    <h4>About me:</h4>
                    <p className={styles["desr-para"]}>
                        {profileData.description}
                    </p>
                    <h4>I'm interested in:</h4>
                    <ul>
                        {
                            profileData.interests.map((interest) => <li>
                                {interest}
                            </li>)
                        }
                    </ul>
               </div>
            <div className={styles["carousel-container"]}>
                    {profileData.carouselPictures.length > 0
                        ? <Carousel pictures = {profileData.carouselPictures}/>
                        : <h1>You have no pictures added yet.</h1>
                    }
                    <form className={styles["upload-carousel-form"]} onSubmit={(e) => onCarouselPicSubmit(e)}>
                        <label htmlFor="carousel-caption">Write a caption for your picture</label>
                        <input 
                        id="carousel-caption" 
                        type="text" 
                        className={styles["upload-carousel-caption"]} 
                        value={carouselCaption}
                        onChange={(e) => onCarouselCaptionChange(e)}
                        />
                        <input type="file" className={styles["upload-carousel-img"]} onChange={(e) => onCarouselPicChange(e)} />
                        <button type="submit" className={styles["upload-carousel-img"]}
                        >
                            Submit
                        </button>
                    </form>
            </div>
        </div>
    )
}