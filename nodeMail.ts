require('dotenv').config();
import nodemailer, { SentMessageInfo } from 'nodemailer';
const SendNodeMail = (recipient: string, subject: string, body: string) => {

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PW
  }
});

var mailOptions = {
  from: 'degrsecretsanta@gmail.com',
  to: recipient,
  subject: subject,
  text: body
};

transporter.sendMail(mailOptions, (error:Error|null, info:SentMessageInfo)=>{
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

export default SendNodeMail;