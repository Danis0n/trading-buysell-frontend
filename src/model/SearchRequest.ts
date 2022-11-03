export interface SearchRequest {
    title: string;
    type: Type;
    location: string;
    minPrice: string;
    maxPrice: string;
}

export interface Type {
    titleType: string;
    mainType: string[];
    subType: string[];
    brandType: string[];
}