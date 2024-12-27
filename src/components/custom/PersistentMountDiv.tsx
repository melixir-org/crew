import React, { useEffect, useState, ReactNode } from 'react';

interface PersistentDisplayWrapperProps {
    children: ReactNode;
    show: boolean;
    [key: string]: any;
}

const PersistentDisplayWrapper: React.FC<PersistentDisplayWrapperProps> = ({
    children,
    show,
    ...rest
}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        if (show) {
            setIsMounted(true);
        }
    }, [show]);

    const mount = show || isMounted;

    return (
        <>
            {mount && (
                <div
                    style={{
                        display: show ? undefined : 'none',
                    }}
                    {...rest}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default PersistentDisplayWrapper;
