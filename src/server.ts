import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
let server: Server;

// Main function to initialize the application
async function main() {
    try {
        // Attempting to connect to the MongoDB database using the connection URL from the config
        await mongoose.connect(config.db_uri as string);

        // Once the database connection is successful, start the Express server
        server = app.listen(config.port, () => {
            console.log(`Blog app server listening on port ${config.port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();