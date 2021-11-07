const nodemailer = require('nodemailer');
const user = process.env.USER;
const pw = process.env.PW;
const smtpTransport = require('nodemailer-smtp-transport');
const SendEmail = async (subject: string, recipient: string, body: string) =>
{
    let Transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pw,
        },
    }));
    const mailOptions = {
        from: user,
        to: recipient,
        subject: subject,
        text: body,
    };
    Transporter.sendMail(mailOptions, (err: Error, info: any) =>
    {
        if (err)
        {
            console.log(err);
        } else
        {
            console.log('Email sent: ' + info.response);
        }
    });

};
export default SendEmail;