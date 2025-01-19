import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './middleware/notFound';
import globalErrorHandler from './middleware/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Default route to confirm whether the server is running or not
app.get('/', (req: Request, res: Response) => {
    res.send('Blog server is running...');
});

// Route not found
app.use('*', notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;