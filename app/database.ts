import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { default as config } from './config';

export class Database {
    public mongoUrl: String;

    // Connect ro mongodb
    // Good way to make sure mongoose never stops trying to reconnect
    // The Number.MAX_VALUE property represents the maximum numeric value representable in JavaScript.
    // reconnectTries suggestion from http://mongoosejs.com/docs/connections.html
    // For long running applications, it is often prudent to enable keepAlive with a number of milliseconds.
    // Without it, after some period of time you may start to see 'connection closed' errors
    // http://mongoosejs.com/docs/connections.html
    public mongoOptions: Object = {
        keepAlive: 2000,
        connectTimeoutMS: 30000,
        reconnectTries: Number.MAX_VALUE
    }

    constructor(){
        this.mongoSetup();
    }

    private mongoSetup(): void{
        if(process.env.NODE_ENV === 'local') this.mongoUrl = `mongodb://localhost:27017/${config.dbname}`;
        else this.mongoUrl = `mongodb://${config.mongoUser}:${config.mongoPassword}@${config.mongoHost}/${config.dbname}?ssl=true&replicaSet=`
        
        mongoose.Promise = bluebird;

        mongoose.connect(this.mongoUrl, this.mongoOptions)

        // If the connection throws an error
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err)
        })

        mongoose.connection.on('reconnected', function () {
            console.log('MongoDB event reconnected')
        })

        mongoose.connection.on('connected', function () {
            console.log('[STARTUP] Connecting to DB...')
        })
        // When the connection is disconnected, Log the error
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected')
        })
        const cleanup = () => {
            mongoose.connection.close(() => {
            console.log('Mongoose disconnected')
            process.exit(0)
            })
        }

        process.on('SIGINT', cleanup)
        process.on('SIGTERM', cleanup)
    }
    
}

