import express, {Express, Request, Response, NextFunction} from "express" 
import { FileProps } from "../types"
import { uploadProfilePic, uploadCarouselPic } from "../services/profileServices"
const router = express.Router()
import multer, {Multer} from "multer"
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
import {registerUser,loginUser, createSession} from "../services/authServices" 
import UserSchema from "../Models/User"

router.post('/my-profile/:userId', upload.single('file'), async (req: Request, res: Response) => {
if(req.file !== undefined){
uploadProfilePic(req.params.userId, req.file)
res.end()
}
// })
 
})

router.post('/my-profile/carousel/:userId', upload.single('file'), async (req: Request, res: Response) => {
    if(req.file !== undefined){
        uploadCarouselPic(req.params.userId, req.file, req.body.caption)
        res.end()
    }
})

export default router