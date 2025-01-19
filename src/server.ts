import app from './app';
import config from './config';
import { Server } from 'http';
let server: Server;

// Main function to initialize the application
async function main() {
    try {
        server = app.listen(config.port, () => {
            console.log(`Blog app listening on port ${config.port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();