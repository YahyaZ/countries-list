import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {CountryParams, CountryResponse} from '../../models';
import {COUNTRIES_URL} from '../../utils';
import {Spinner} from '../Spinner/Spinner';

import './Country.css';

const Country = () => {
    const {countryCode} = useParams<CountryParams>();
    const [country, setCountry] = useState<CountryResponse>({
        name: '',
        alpha3Code: '',
        demonym: '',
        flag: '',
        population: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${COUNTRIES_URL}alpha/${countryCode}`, {method: 'GET'})
            .then((res) => {
                if (!res.ok) {
                    return;
                }

                return res.json();
            })
            .then((result) => {
                if (!result) {
                    window.location.assign('/');

                    return;
                }

                setIsLoading(false);
                setCountry(result);
            })
    }, []);
    
    return isLoading ? (
        <Spinner />
    ) : (
        <React.Fragment>
            <a href="/" className="btn btn-light c-back-button">Back</a>
            <div className="l-country">
                <div>
                    <div className="c-country-flag-placeholder">
                        <img className="c-country-flag" src={country.flag} />
                    </div>
                    <h1 className="c-country-name">{country.name}</h1>
                </div>
                <div>
                    <table className="table">
                        <tr>
                            <td scope="row">Population</td>
                            <td>{country.population}</td>
                        </tr>
                        <tr>
                            <td scope="row">Demonym</td>
                            <td>{country.demonym}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
}

export {Country};