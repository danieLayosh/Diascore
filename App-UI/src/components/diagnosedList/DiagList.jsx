import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export const DiagList = ({ names }) => {
    const [currentNames, setCurrentNames] = useState(names);

    useEffect(() => {
        // Ensure we set the state to an array
        setCurrentNames(names);
        console.log("Diagnosed items:", names);
    }, [names]); // This effect runs when `names` prop changes

    return (
        <div>
            {currentNames.length > 0 ? (
                currentNames.map((name, index) => (
                    <h2 key={index}>{JSON.stringify(name[1].name)} {JSON.stringify(name[1].description)}</h2> // Assuming each name object has a 'name' property
                ))
            ) : (
                <p>No diagnoses available.</p> // Optional message if there are no diagnoses
            )}
            <h1>currentNames length: {currentNames.length}</h1> {/* Display the length of the array */}
        </div>
    );
};

DiagList.propTypes = {
    names: PropTypes.array.isRequired, // Ensure it expects an array
};
