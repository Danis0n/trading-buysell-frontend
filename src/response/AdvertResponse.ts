import { Advert } from "../model/Advert";

export interface AdvertsResponse {
    adverts: Advert[];
}

export interface AdvertResponse {
    advert: Advert;
}