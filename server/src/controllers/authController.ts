import express, {Express, Request, Response, NextFunction} from "express" 
const router = express.Router()
import {registerUser,loginUser, createSession} from "../services/authServices" 

router.post('/register', (req: Request, res: Response) => {
  registerUser(req.body)
  .then((newUser) => {
    let session = createSession(newUser.firstName, newUser.lastName, newUser.email, newUser._id)
    res.json(session)
})
  .catch(err => res.status(err.status || 400).json({message: err.message}))
})

router.post('/login', (req: Request, res: Response) => {
   loginUser(req.body)
   .then((session) => res.json(session))
   .catch(err => res.status(err.status || 400).json({message: err.message}))
})


export default router