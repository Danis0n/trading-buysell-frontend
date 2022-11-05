export interface SearchRequest {
    title: string;
    type: Type;
    minPrice: string;
    maxPrice: string;
}

export interface Type {
    titleType: string;
    mainType: string[];
    subType: string[];
    brandType: string[];
    location: string[];
}