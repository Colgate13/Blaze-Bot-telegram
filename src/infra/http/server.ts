import express from 'express';
import cors from 'cors';
import routes from './routes/intex';
import * as http from 'http';

class ServerHttp {

    protected app;
    protected server;

    constructor(port: number | string) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.start(port);
    }

    init() {
        this.routes();
    }

    start(port: number | string) {
        this.app.use(cors());
        this.app.use(express.json());
        this.server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }

    routes() {
        this.app.use(routes);
    }

}
export default ServerHttp;
