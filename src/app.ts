
// all the imports here
import express, { Application } from "express";
import cors from 'cors';
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { applicationRouetes } from "./routes";

// create an express application
const app: Application = express();

// all the parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({

    credentials: true,
}));

// application routes
app.use('/api/social-media', applicationRouetes);

// all the error
app.use(globalErrorHandler);

// not found middleware
app.use(notFound);

// export express app
export default app;