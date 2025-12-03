import React from 'react';

const Dropdown = ({ options, value, onChange, className = '' }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`dropdown ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
