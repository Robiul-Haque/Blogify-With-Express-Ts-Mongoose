import express, { Application, Request, Response } from 'express';
const app: Application = express();

app.use(express.json());

// Default route to confirm whether the server is running or not
app.get('/', (req: Request, res: Response) => {
    res.send('Blog server is running...');
});

export default app;