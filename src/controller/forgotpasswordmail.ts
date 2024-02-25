import { Request, Response } from 'express';
import { loadEmailTemplate } from '../helpers/loadTemplate';
import { sendMail } from './sendmail';
import 'dotenv/config';

const email = process.env.MAIL_ID;

export const forgotPasswordMail = async (req: Request, res: Response) => {
    try{
        const {to, data} = req.body;
        const compiledTemplate = await loadEmailTemplate('forgotPasswordMail');
    
        // Use the compiled template to generate HTML with the replacement data
        const emailHtml = compiledTemplate(data);
    
        // Set up the email details
        const mailOptions = {
          from: `"Bash Boss" <${email}>`,
          to: to,
          subject: 'Password Reset',
          html: emailHtml,
        };
        const isSendMailSuccess = await sendMail(mailOptions);
        if(isSendMailSuccess){
            res.status(200).send('Email sent successfully');
        }
        else{
            res.status(500).send('Failed to send email');
        }
    }
    catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).send('Failed to send email');
    }
};