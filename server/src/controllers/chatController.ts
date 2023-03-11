import express, {Express, Request, Response, NextFunction} from "express" 
import { saveSentMessage, getConvo } from "../services/chatServices"

const router = express.Router()

router.post('/send', async (req: Request, res: Response) => {
    try{
     let communicationData = await saveSentMessage(req.body)
     res.json(communicationData)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.get('/get-last/:userOneId/:userTwoId',async (req: Request, res: Response) => {
    try{
     let communicationData = await getConvo(req.params.userOneId, req.params.userTwoId)
     res.json(communicationData)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})


export default router