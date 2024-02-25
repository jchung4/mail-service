import express from "express";
import { sendMail } from "./controller/sendmail";
import { forgotPasswordMail } from "./controller/index";



const router = express.Router();

// Example route setup
// router.get('/', appController.someFunction);
router.post("/forgot-password-mail", forgotPasswordMail);

export default router;