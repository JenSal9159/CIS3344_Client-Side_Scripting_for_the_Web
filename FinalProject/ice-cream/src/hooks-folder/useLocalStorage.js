import { useState, useEffect } from 'react';

//create custom hook for our local storage
//accepts key and initial value
const useLocalStorage = (key, storedValue) => {
    //lazy initial state: state used during the initial render- subsequent renders are disregarded
    const [value, setValue] = useState(() => {
        try {
            //if there is an intitial value, we return it by parsing it
            const localValue = window.localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : storedValue;
        } catch (error) {
            return storedValue;
        }
    });

    //update local storage if change in key or value
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    //setValue updates local storage data
    return [value, setValue];
};

export default useLocalStorage;