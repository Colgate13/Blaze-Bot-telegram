import axios, { Axios as IAxios } from 'axios';

export class Axios {
    public axios: IAxios;

    constructor(url: string) {
        this.axios = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            }
        });
    }

    public async get(url: string) {
        return await this.axios.get(url);
    }

    public async post(url: string, data: any) {
        return await this.axios.post(url, data);
    }
}