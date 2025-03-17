
// all the imports here
import { Request, Response } from 'express';
import app from './app';
import mongoose from 'mongoose';
import { envFile } from './envConfig';
import { Server } from 'http';

// app running port
const port = envFile.port;

// app db url
const dbUrl = envFile.dbUrl as string;


// the home page
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

let server: Server;

// main function
const main = async () => {
    try {
        // connect the database
        await mongoose.connect(dbUrl);

        // app is running
        server = app.listen(port, (error) => {
            if (!error) {
                console.log(`social media app listening on port ${port}`);
            } else {
                console.log('application can not listening');
            }
        });
    } catch (error) {
        console.error('somethin went wrong!!!');
        console.error(error)
    }

};


// call the main function
main();



// unhandle rejection handle
process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});


//   un caught expection handle
process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});

