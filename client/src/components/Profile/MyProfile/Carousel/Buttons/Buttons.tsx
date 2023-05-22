import styles from "./buttons.module.css"
type ButtonFuncProps = {
    isFirstSlide : boolean,
    isLastSlide : boolean,
    goToNextSlide : () => void,
    goToPreviousSlide : () => void,
}

export function Buttons({isFirstSlide, isLastSlide, goToNextSlide, goToPreviousSlide}: ButtonFuncProps){
    return(
        <>
        {!isFirstSlide && <a className={styles.previous} onClick={e => goToPreviousSlide()}>
            &#10094;
            </a>
            }
        {!isLastSlide && <a className={styles.next} onClick={e => goToNextSlide()}>
            &#10095;
            </a>
            }
        </>
    )
}