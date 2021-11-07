//getAndStoreToken.js
'use strict';
import fs from 'fs';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const { promisify } = require('util');
const { OAuth2Client } = require('google-auth-library');

// Promisify with promise
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
// @ts-ignore:
const rlQuestionAsync = promisify(rl.question);

const SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.readonly'
];
const TOKEN_DIR = __dirname;
const TOKEN_PATH = TOKEN_DIR + '/gmail-nodejs-quickstart.json';

const main = async () =>
{
    const content = await readFileAsync(__dirname + '/OAuthKeys.json');
    const credentials = JSON.parse(content); //credential
    //authentication
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    //get new token
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });

    console.log('Authorize this app by visiting this url: ', authUrl);

    rl.question('Enter the code from that page here: ', (code: string) =>
    {
        rl.close();

        oauth2Client.getToken(code, async (err: Error, token: string) =>
        {
            if (err)
            {
                console.log('Error while trying to retrieve access token', err);
                return;
            }

            oauth2Client.credentials = token;

            try
            {
                fs.mkdirSync(TOKEN_DIR);
            } catch (err: Error | any)
            {
                if (err.code != 'EEXIST') throw err;
            }

            await writeFileAsync(TOKEN_PATH, JSON.stringify(token));
            console.log('Token stored to ' + TOKEN_PATH);
        });
    });
};
main();