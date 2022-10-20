import { SmartImage } from "./Image";

export interface Advert {
    id: string;
    title: string;
    location: string;
    description: string;
    userId: string;
    dateOfCreation: string;
    price: string;
    images: SmartImage[];    
    type: Type;
}



export interface Type {
    name: string;
}