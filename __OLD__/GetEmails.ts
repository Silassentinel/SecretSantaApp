import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
const GetEmails = async () =>
{

    const gmail = google.gmail({ version: 'v1' });
    const auth = await authenticate({
        keyfilePath: './OAuthKeys.json',
        scopes: [
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/gmail.compose',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/gmail.readonly'
        ],
    });
    google.options({ auth });
    return await gmail.users.messages.list({ userId: 'me' });
};

export default GetEmails;