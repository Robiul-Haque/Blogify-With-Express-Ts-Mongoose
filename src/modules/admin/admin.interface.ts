// update admin type
export type TUpdateAdmin = {
    id: string;
    name: string;
    image: {
        url: string;
        publicId: string;
    };
}