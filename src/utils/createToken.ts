import jwt from "jsonwebtoken";

// Generates a JSON Web Token.
export const createToken = (payload: { email: string }, jwt_secret: string, expiresIn: any): string => {
    return jwt.sign({ email: payload.email }, jwt_secret, { expiresIn });
};