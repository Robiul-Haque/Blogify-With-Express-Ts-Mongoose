// Define the User type
export type TUser = {
    name: string;
    email: string;
    image?: {
        url: string;
        publicId: string;
    };
    password: string;
    role: 'user' | 'admin';
    isVerified: boolean;
    otp: string | null;
    otpExpiry: Date | null;
}