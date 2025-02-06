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
    // NODE_MAIL_SERVICE
    node_mailer_service: process.env.NODE_MAILER_SERVICE,
    node_mailer_user: process.env.NODE_MAILER_USER,
    node_mailer_password: process.env.NODE_MAILER_PASSWORD,
    node_mailer_email: process.env.NODE_MAILER_EMAIL,
    jwt_access_key: process.env.JWT_ACCESS_KEY,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_key: process.env.JWT_REFRESH_KEY,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
}