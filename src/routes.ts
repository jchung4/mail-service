import express from "express";
import { sendMail } from "./sendmail";



const router = express.Router();

// Example route setup
// router.get('/', appController.someFunction);
router.post("/sendmail", sendMail);

export default router;