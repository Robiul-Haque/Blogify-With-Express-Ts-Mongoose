import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
import seedAdmin from './DB';
let server: Server;

// Main function to initialize the application.
async function main() {
    try {
        // Attempting to connect to the MongoDB database using the connection URL from the config.
        await mongoose.connect(config.db_uri as string);

        // When DB is connect successfully, create a admin by default admin is not exits in the user collection.
        seedAdmin();

        // Once the database connection is successful, start the Express server.
        server = app.listen(config.port, () => {
            console.log(`Blog app server listening on port ${config.port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();

process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});