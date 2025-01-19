import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Default route to confirm whether the server is running or not
app.get('/', (req: Request, res: Response) => {
    res.send('Blog server is running...');
});

export default app;