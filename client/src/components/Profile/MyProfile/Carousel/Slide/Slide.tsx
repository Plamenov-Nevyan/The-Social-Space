import styles from "./slide.module.css"
type SlideProps = {
    active : boolean,
    slidePicture : string,
    slideIndex : number,
    caption : string,
    totalSlides : number,
}

export function Slide({active , slidePicture, slideIndex, caption, totalSlides} : SlideProps){
    return (
        <div className={
            active 
            ? `${styles["slide-container-active"]} ${styles.fade}`
            : `${styles["slide-container"]} ${styles.fade}`
        }
        >
           <div className={styles["number-caption"]}>{slideIndex}/{totalSlides}</div>
           <img src={slidePicture} className={styles["slide-picture"]}></img>
           <div className={styles["text-caption"]}>{caption}</div>
        </div>
    )
}