export interface User{
    id: string;
    username: string;
    enabled: boolean;
    locked: boolean;
    info : Info;
}

export interface Info {
    name: string;
    phoneNumber: string;
    email : string;
    rating: string;
    dateOfCreation: string;
}