import React, { useState, useEffect } from 'react';
import {CountryResponse} from '../../models';
import {COUNTRIES_URL} from '../../utils';
import {Spinner} from '../Spinner/Spinner';

import './Countries.css';

const PAGINATION_SIZE = 10;

const Countries = () => {
    const [countries, setCountries] = useState<CountryResponse[]>([]);
    const [searchInput, setSearchText] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<CountryResponse[]>([]);
    const [isFilterEnabled, setIsFilterEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const searchCountries = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!searchInput) {
            setIsFilterEnabled(false);
            setFilteredCountries([]);

            return;
        }

        const searchText = searchInput.toLowerCase();

        setIsFilterEnabled(true);
        // ideally search would also hit the endpoint as that's the source of truth
        // but since countries is fairly static it doesn't matter too much
        setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(searchText)));
    };
    
    useEffect(() => {
        // ideally with a large enough endpoint we'd handle pagination on the endpoint too
        // however, since countries info is fairly static just grab everything
        fetch(`${COUNTRIES_URL}all?fields=name;alpha3Code`, {method: 'GET'})
            .then((res) => {
                if (!res.ok) {
                    return;                    
                }

                return res.json();
            })
            .then((result) => {
                setIsLoading(false);
                
                if (!result) {
                    return;
                }

                setCountries(result);
            });
    }, []);

    const displayedCountries = isFilterEnabled ? filteredCountries : countries;

    return isLoading ? (
        <Spinner />
    ) : (
        <div className="l-countries-list">
            <form onSubmit={searchCountries}>
                <div className="l-layout-grouping">
                    <input
                        type="text"
                        value={searchInput}
                        placeholder="Type here to search..."
                        onChange={(e) => setSearchText(e.currentTarget.value)}/>
                    <button type="submit" className="btn btn-light">Search</button>
                </div>
            </form>
            <ul className="c-countries-items list-group">
                {/* As pageNumber starts at 1, -1 to match the array index */}
                {displayedCountries.slice((pageNumber - 1) * PAGINATION_SIZE, pageNumber * PAGINATION_SIZE).map((country) => (
                    <li className="c-countries-item list-group-item" key={country.alpha3Code}><a href={`/${country.alpha3Code}`}>{country.name}</a></li>
                ))}
            </ul>
            <div className="l-layout-grouping">
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setPageNumber((curr) => curr - 1)}
                    disabled={pageNumber === 1}>
                        Previous
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setPageNumber((curr) => curr + 1)}
                    disabled={pageNumber * PAGINATION_SIZE >= displayedCountries.length}>
                        Next
                </button>
            </div>
        </div>
    );
}

export {Countries};