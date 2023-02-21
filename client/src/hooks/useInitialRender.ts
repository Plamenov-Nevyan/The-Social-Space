import {useRef} from "react"

export const useInitialRender = () => {
  const isInitialRender = useRef(true)
  const setIsInitialRender = (flag: boolean) => {
    isInitialRender.current = flag
  }

  return {isInitialRender, setIsInitialRender}
}