import React, { useState, useEffect } from 'react';
import { useCalendarContext } from '../context/CalendarContext';
import { getAvailableCountries } from '../api/festivals';

const CountrySelector = () => {
    const { state, dispatch } = useCalendarContext();
    const [countries, setCountries] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const availableCountries = await getAvailableCountries();
                setCountries(availableCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const handleCountryChange = (countryCode) => {
        dispatch({ type: 'SET_COUNTRY_CODE', payload: countryCode });
        setIsOpen(false);
    };

    const currentCountry = countries.find(c => c.countryCode === state.countryCode) || { name: 'India', countryCode: 'IN' };

    return (
        <div className="country-selector">
            <button 
                className="country-selector-btn"
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentCountry.name} ({currentCountry.countryCode})
            </button>
            {isOpen && (
                <div className="country-dropdown">
                    {countries.map((country) => (
                        <div
                            key={country.countryCode}
                            className={`country-option ${state.countryCode === country.countryCode ? 'active' : ''}`}
                            onClick={() => handleCountryChange(country.countryCode)}
                        >
                            {country.name} ({country.countryCode})
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountrySelector;

