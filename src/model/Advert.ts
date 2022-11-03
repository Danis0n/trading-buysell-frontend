import { SmartImage } from "./Image";

export interface Advert {
    id: string;
    title: string;
    location: string;
    isHidden: boolean;
    isHiddenByAdmin: boolean;
    description: string;
    userId: string;
    dateOfCreation: string;
    price: string;
    images: SmartImage[];    
    type: Type;
}

export interface Type {
    brandType: BrandType;
    mainType: MainType;
    subType: SubType;
    titleType: TitleType;
}

export interface TitleType {
    id: string;
    name: string;
}
export interface MainType {
    id: string;
    name: string;
}
export interface BrandType {
    id: string;
    name: string;
}
export interface SubType {
    id: string;
    name: string;
}