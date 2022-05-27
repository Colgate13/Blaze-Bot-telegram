import dotenv from 'dotenv';
import ServerHttp from './infra/http/server';

dotenv.config();

const PORT = process.env.PORT || "3000";

const server = new ServerHttp(PORT);

server.init();

process.on('SIGINT', function () {
  process.exit();
});
