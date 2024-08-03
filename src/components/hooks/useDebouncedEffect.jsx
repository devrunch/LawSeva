import { useEffect, useState } from 'react';

const useDebouncedEffect = (value, delay, callback) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    useEffect(() => {
        if (debouncedValue) {
            callback(debouncedValue);
        }
    }, [debouncedValue, callback]);

    return debouncedValue;
};

export default useDebouncedEffect;
