import fs from 'fs';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const gmail = google.gmail({ version: "v1" });

const TOKEN_PATH = './token.json'; // Specify the access token file
const SendEmail = async (recipient: string, subject: string, body: string) =>
{
    // Get credential information  & specify the client secret file
    const fileData = fs.readFileSync('./OAuthKeys.json', 'utf8');
    const credentials = JSON.parse(fileData);

    // auth
    const clientSecret: string = credentials.installed.client_secret;
    const clientId: string = credentials.installed.client_id;
    const redirectUrl: string = credentials.installed.redirect_uris[0];
    const oauth2Client: OAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
    const token: string = fs.readFileSync(TOKEN_PATH, 'utf-8');
    oauth2Client.credentials = JSON.parse(token);


    // create encoded email message

        const encodedEmail = [
        'Content-Type: text"\r\n',
        'MIME-Version: 1.0\r\n',
        `From: me\r\n`,
        `To: ${recipient}\r\n`,
        `Subject: ${subject}\r\n\r\n`,
        'Content-Type: text/plain; charset="base64"\r\n',
        'MIME-Version: 1.0\r\n',
        'Content-Transfer-Encoding: base64\r\n\r\n',
         `${body}\r\n\r\n`,]

    // create buffer from encoded email
    const encodedEmailBuffer = new Buffer(encodedEmail.join(""),"base64")


    // send email via  the gmail API with encoded body
    google.options({ auth: oauth2Client });

    await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedEmailBuffer.toString('base64')
        }
    });

    // send email 

};

export default SendEmail;