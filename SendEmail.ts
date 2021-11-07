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
    const email = 'To:' + recipient + '\r\n' +'Subject:' + subject + '\r\n' +'Content-type:text/html;charset=utf-8\r\n' + '\r\n' +body;

    // create buffer from encoded email
    const encodedEmailBuffer = Buffer.from(email,"utf-8").toString("base64");


    // send email via  the gmail API with encoded body
    google.options({ auth: oauth2Client });

    gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedEmailBuffer
        }
    });

    // send email 

};

export default SendEmail;