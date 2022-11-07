export interface User{
    id: string;
    username: string;
    enabled: boolean;
    locked: boolean;
    info : Info;
    roles: Role[];
}

export interface Role {
    name: string;
}

export interface Info {
    name: string;
    phone: string;
    email : string;
    rating: string;
    dateOfCreation: string;
}