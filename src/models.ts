export interface CountryResponse {
    name: string;
    alpha3Code: string;
    flag: string;
    population: number;
    demonym: string;
};

export interface CountryParams {
    countryCode: string; 
};