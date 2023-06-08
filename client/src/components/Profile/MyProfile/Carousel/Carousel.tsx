import { useState } from 'react'
import styles from "./carousel.module.css"
import { Buttons } from './Buttons/Buttons'
import { Indicators } from './Indicators/Indicators'
import { Slide } from './Slide/Slide'
import { CarouselPicture } from '../../../../types'

type CarouselProps = {
  pictures : CarouselPicture[]
}

export function Carousel({pictures}:CarouselProps ){
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToNextSlide = () => setCurrentSlide(currSlide => currSlide + 1)
  const goToPreviousSlide = () => setCurrentSlide(currentSlide => currentSlide - 1)
  const goToSlide = (slideIndex : number) => setCurrentSlide(slideIndex)

  return (
    <>
  <div className={styles["carousel-container"]}>
         {pictures.map((pic, index) => <Slide 
         key={index}
         active = {currentSlide === index}
         slidePicture={pic.src} 
         slideIndex={index + 1} 
         caption={pic.caption} 
         totalSlides={pictures.length}
         />
         )}
         <Buttons 
         isFirstSlide={currentSlide === 0} 
         isLastSlide={currentSlide === pictures.length - 1} 
         goToNextSlide={goToNextSlide}
          goToPreviousSlide={goToPreviousSlide}
         />
  </div>
  <Indicators slides={pictures} currentSlide={currentSlide} goToSlide={goToSlide}/>
  </>
  )
}
