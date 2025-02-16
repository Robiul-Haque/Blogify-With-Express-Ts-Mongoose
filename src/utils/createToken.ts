import jwt from "jsonwebtoken";

// Generates a JSON Web Token.
export const createToken = (payload: { name: string, email: string, role: string }, jwt_secret: string, expiresIn: any): string => {
    const { name, email, role } = payload;
    
    return jwt.sign({ name, email, role }, jwt_secret, { expiresIn });
};