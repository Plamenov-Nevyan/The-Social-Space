import express, { Express } from "express";
import authController from "./controllers/authController"
import chatController from "./controllers/chatController"
const router = express.Router()

router.use('/', authController)
router.use('/chat', chatController)

export default router