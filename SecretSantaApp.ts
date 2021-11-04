import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
export interface Dictionary<T> {
    [Key: string]: T;
}
export class SecretList {
    private _list: Dictionary<string> = {};
    public add(key: string, value: string): void {
        this._list[key] = value;
    }
    public get(key: string): string {
        return this._list[key];
    }
    public get list(): Dictionary<string> {
        return this._list;
    }
    public foreach(callback: (key: string, value: string) => void): void {
        for (const key in this._list) {
            if (this._list.hasOwnProperty(key)) {
                callback(key, this._list[key]);
            }
        }
    }
}
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
    emails = e.split(' ');
    const sl = new SecretList();
    for (let i = 0; i < names.length; i++) {
        sl.add(names[i], emails[i]);
    }
    // names.map(
    //     (name: string/*, index: Number*/) => {
    //         emails.map((
    //             email: string/*, index: Number*/) => {
    //                 email
    //                 sl.add(name, email);
    //             });

    //     });
    sl.foreach((key, value) => {console.log(`${key}: ${value}`);});
};

run().then().catch(console.error);