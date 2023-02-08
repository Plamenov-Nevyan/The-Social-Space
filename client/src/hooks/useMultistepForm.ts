import { ReactElement } from "react";
import { useState } from "react";

export function useMultistepForm(steps : ReactElement[]){
   const [currentStepIndex, setCurrentStepIndex] = useState(0)

function nextStep(){
   setCurrentStepIndex(currIndex => currIndex >= steps.length - 1 ? currIndex : currIndex + 1)
}
function previousStep(){
   setCurrentStepIndex(currIndex => currIndex <= 0 ? currIndex : currIndex - 1)
}
function goToStep(index : number){
   setCurrentStepIndex(index)
}

   return {
    steps,
    currentStepIndex,
    step : steps[currentStepIndex],
    isFirstStep : currentStepIndex === 0,
    isLastStep : currentStepIndex === steps.length -1,
    nextStep,
    previousStep,
    goToStep
   }
}