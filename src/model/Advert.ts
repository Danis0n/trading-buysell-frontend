export interface Advert {
    id: string;
    title: string;
    location: string;
    description: string;
    userId: string;
    dateOfCreation: string;
    price: string;
    images: Image[];
    type: Type;
}

export interface Image{
    id: string;
    name: string;
    contentType: string;
    size: string;
    url: string;
}

export interface Type {
    name: string;
}