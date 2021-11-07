import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import SecretList from './SecretList';
import shuffle from './Shuffle';
import SendEmail from './SendEmail';
import GetEmails from './GetEmails';
export const run = async () =>
{
    const sl = new SecretList();
    if (process.argv.length)
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
        shuffledEmails.reverse();
        shuffledNames.reverse();
        for (let i = 0; i < names.length; i++)
        {
            sl.add(shuffledEmails[i], shuffledNames[i]);
        }
    } else
    {
        const emails: string[] = await GetEmails();
        const shuffledEmails = shuffle(emails);
        shuffledEmails.map((email) =>
        {
            names.push(email.split('@')[0]);
        });
        const names: string[] = [];
        const shuffledNames = shuffle(names);
        for (let i = 0; i < names.length; i++)
        {
            sl.add(shuffledEmails[i], shuffledNames[i]);
        }
    }
    sl.foreach(async (key, value) =>
    {
        await SendEmail(key, "Your SecretSanta pick is", value);
        // console.log(`${key}: ${value}`);
    });
};

run().then().catch(console.error);