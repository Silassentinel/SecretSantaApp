//getBodyContent.js
/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

'use strict';

const fs = require('fs');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const gmail = google.gmail('v1');

const TOKEN_PATH = './token.json'; // Specify the access token file

const main = async () =>
{
    // Get credential information  & specify the client secret file
    const content = fs.readFileSync('./OAuthKeys.json');
    const credentials = JSON.parse(content); // credential

    // authentication
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
    const token = fs.readFileSync(TOKEN_PATH);
    oauth2Client.credentials = JSON.parse(token);

    // Access the gmail via API
    let res=  await gmail.users.messages.list({        
        auth: oauth2Client,
        userId: "me",
        maxResults: 1});

    // Get the message id which we will need to retreive tha actual message next.
    const newestMessageId = res["data"]["messages"][0]["id"];
    // Retreive the actual message using the message id
    let email = await gmail.users.messages.get({
        auth: oauth2Client,
        userId: "me",
        id: newestMessageId,
    });
    //Then we will need to decode the base64 encoded message.
    let body_content = JSON.stringify(email.data.payload.body.data);
    let data, buff, text;
    data = body_content;
    buff = new Buffer.from(data, "base64");
    mailBody = buff.toString();
    // display the result
    console.log(mailBody);
};

main();