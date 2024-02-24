import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';

dotenv.config();

// Environment variables for email configuration
const email = process.env.MAIL_ID;
const password = process.env.MAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  },
});


export const sendMail =  async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: `"Bash Boss" <${email}>`,
      to,
      subject,
      text,
    });

    res.send('Email sent successfully');
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).send('Failed to send email');
  }
}
