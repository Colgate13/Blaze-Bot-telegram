import { Axios } from './axios/axiosClass';

export class GetTilesPrevious {
    protected _url: string;
    protected Fetch: any;

    constructor(url?: string) {
        this._url = url || 'http://velloware.vps-kinghost.net';
        this.Fetch = new Axios(this._url)
    }

    get url() {
        return this._url;
    }

    public async fetch(path: string) {
        return await this.Fetch.get(`${path}`);
    }

    public async getTilesPreviousData() {
        return await this.Fetch.get('/use');
    }

    public async getTilesHistoryData() {
        return await this.Fetch.get('/history/get');
    }

    public async fetchTilesKitBlaze() {
        return await this.Fetch.get('/tribozord/Kitblaze/');
    }

}
