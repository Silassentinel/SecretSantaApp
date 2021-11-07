# SecretSantaApp

HOWTO:

- Activate gmail api = https://console.cloud.google.com/apis/library/gmail.googleapis.com
- get OAuth from google = https://console.cloud.google.com/apis/credentials store in OAuthKeys.json (in proj folder)
- run ts-node ./GetAndStoreToken.ts
- Go to url in console
- copy token and past in console
- token.json is created in project root
- then run ts-node ./SecretSantaApp.ts -e email1@provider.example,email2@provider.com -n name1,name2
