import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join((process.cwd(), '.env')) });

// Access environment variables
export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_uri: process.env.DATABASE_URI,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    salt_rounds: process.env.SALT_ROUNDS,
}