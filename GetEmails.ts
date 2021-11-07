import fs from 'fs';
import { gmail_v1, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GaxiosResponse } from 'googleapis-common';

const gmail = google.gmail({ version: "v1" });

const TOKEN_PATH = './token.json'; // Specify the access token file

const GetEmails = async () : Promise<GaxiosResponse<gmail_v1.Schema$Message>[]> =>
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

    // Access the gmail via API
    let res = await gmail.users.messages.list({
        auth: oauth2Client,
        userId: "me",
        //maxResults: 1
    });
    // get email ids
    let emailIds: string[] = [];
    res?.data?.messages?.forEach(message => {
        emailIds.push(message.id as string);
    });
    // get all emails
    let emailList: GaxiosResponse<gmail_v1.Schema$Message>[] = [];
    for (let id of emailIds) {
        emailList.push(await gmail.users.messages.get({
            auth: oauth2Client,
            userId: "me",
            id: id
        }));
    }
    // emailIds.forEach(async (val:string /*, index:number*/)=>{
    //    let temp = await gmail.users.messages.get({
    //         auth: oauth2Client,
    //         id: val,
    //         userId: "me"
    //     });
    //     emailList.push(temp);
    // });
    // Retreive the actual message using the message id
    return emailList;
};

export default GetEmails;