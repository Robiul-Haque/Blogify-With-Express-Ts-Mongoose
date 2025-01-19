import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join((process.cwd(), '.env')) });

// Access environment variables
export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
}