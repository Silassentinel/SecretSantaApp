import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import SecretList  from './SecretList';
import shuffle from './Shuffle';
// import SendEmail from './SendEmail';
import SendNodeMail from './nodeMail';
// import GetEmails from './GetEmails';
export const run = async () =>
{
    const argv = yargs(hideBin(process.argv)).argv;
    // @ts-ignore:
    const { n } = argv;
    // @ts-ignore:
    const { e } = argv;
    let names: string[] = [];
    let emails: string[] = [];
    names = n.split(' ');
    const shuffledNames = shuffle(names);
    emails = e.split(' ');
    const shuffledEmails = shuffle(emails);

    const sl = new SecretList();
    for (let i = 0; i < names.length; i++) {
        sl.add(shuffledEmails[i],shuffledNames[i]);
    }
    sl.foreach(async (key, value) => {
       await SendNodeMail(key,"your SecretSanta Pick is", value);
       // console.log(`${key}: ${value}`);
    });
};

run().then().catch(console.error);