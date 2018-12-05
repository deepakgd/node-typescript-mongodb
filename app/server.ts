import app from './app';
import { Database } from './database';
import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.NODE_ENV)
const PORT = 3030;

var db = new Database();

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})