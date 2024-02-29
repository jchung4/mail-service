import { Request, Response } from 'express';
import { loadEmailTemplate } from '../helpers/loadTemplate';
import { sendMail } from './sendmail';
import 'dotenv/config';

const email = process.env.MAIL_ID;

export const eventRegistrationConfirmationMail = async (req: Request, res: Response) => {
    try {
        const {to, data} = req.body;
        const compiledTemplate = await loadEmailTemplate('eventRegistrationConfirmation');

        // Use the compiled template to generate HTML with the replacement data
        const emailHtml = compiledTemplate(data);

        // Set up the email details
        const mailOptions = {
            from: `"Bash Boss" <${email}>`,
            to: to,
            subject: 'Event Registration Confirmation',
            html: emailHtml,
        };
        const isSendMailSuccess = await sendMail(mailOptions);
        if (isSendMailSuccess) {
            res.status(200).send('Confirmation email sent successfully');
        } else {
            res.status(500).send('Failed to send confirmation email');
        }
    } catch (error) {
        console.error('Error sending event registration confirmation email:', error);
        res.status(500).send('Failed to send email');
    }
};
