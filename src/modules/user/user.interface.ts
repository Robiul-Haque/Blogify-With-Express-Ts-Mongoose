export type TCreateUser = {
    name: string;
    email: string;
    image?: {
        url: string;
        publicId: string;
    };
    password: string;
    bookmark?: string[];
    role: 'user' | 'admin';
    isVerified: boolean;
    isBlocked: boolean;
    otp: string | null;
    otpExpiry: Date | null;
}

export type TUpdateUser = {
    id: string;
    name: string;
    image: {
        url: string;
        publicId: string;
    };
}