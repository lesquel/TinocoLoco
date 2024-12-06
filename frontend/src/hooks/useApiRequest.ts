
import { useState, useEffect } from 'react';

export function useApiRequest<T>(apiFunction: () => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiFunction()
            .then(response => {
                setData(response);
            })
            .catch(err => {
                setError('Error al obtener los datos');
                console.error(err);
            });
    }, [apiFunction]);

    return { data, error };
}
