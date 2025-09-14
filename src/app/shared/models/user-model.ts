
export interface User{
    id: number;
    email: string;
    name: string;
    createdAt: string;
    city?: string;
    imgUrl?: string;
    bio?: string;
    traits?: string[];
}