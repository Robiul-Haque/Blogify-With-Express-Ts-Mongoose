import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './middleware/notFound';
import globalErrorHandler from './middleware/globalErrorHandler';
import router from './router';
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ["https://blogify0.netlify.app", "http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(cookieParser());
app.use('/api/v1', router);
app.options('*', cors());

// Default route to confirm whether the server is running or not
app.get('/', (req: Request, res: Response) => {
    res.send('Blog server is running...');
});

// Route not found
app.use('*', notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
