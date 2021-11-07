import Dictionary from "src/Dictionary";
export default class SecretList extends Array<string>
{
    private _list: Dictionary<string> = {};
    public length!: number;
    public add(key: string, value: string): void
    {
        this._list[key] = value;
        this.length ++;
    }
    public get(key: string): string
    {
        return this._list[key];
    }
    public get list(): Dictionary<string>
    {
        return this._list;
    }
    public foreach(callback: (key: string, value: string) => void): void
    {
        for (const key in this._list)
        {
            if (this._list.hasOwnProperty(key))
            {
                callback(key, this._list[key]);
            }
        }
    }
}