'use client';

import { useEffect, useState } from 'react';

const Page = () => {
    const [error, setError] = useState<string>('');
    const [error_code, setErrorCode] = useState<string>('');
    const [error_description, setErrorDescription] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;

            const params = new URLSearchParams(hash.slice(1));
            setError(params.get('error') ?? '');
            setErrorCode(params.get('error_code') ?? '');
            setErrorDescription(
                decodeURIComponent(params.get('error_description') ?? '')
            );
        }
    }, []);

    return (
        <div>
            <p className="text-center">
                {error}: {error_code}
            </p>
            <p className="text-center text-lg">{error_description}</p>
        </div>
    );
};

export default Page;
