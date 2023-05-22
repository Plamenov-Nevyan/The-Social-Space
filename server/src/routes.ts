import express, { Express } from "express";
import authController from "./controllers/authController"
import chatController from "./controllers/chatController"
import profilesController from "./controllers/profilesController"
const router = express.Router()

router.use('/', authController)
router.use('/chat', chatController)
router.use('/profiles', profilesController)

export default router