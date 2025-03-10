import jwt from "jsonwebtoken";

// Generates a JSON Web Token.
export const createToken = (payload: { id: string, name: string, email: string, role: string }, jwt_secret: string, expiresIn: any): string => {
    const { id, name, email, role } = payload;

    return jwt.sign({ id, name, email, role }, jwt_secret, { expiresIn });
};