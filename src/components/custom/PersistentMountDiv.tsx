import React, { useEffect, useState, ReactNode } from 'react';

interface PersistentMountDivProps {
    children: ReactNode;
    show: boolean;
    [key: string]: any;
}

const PersistentMountDiv: React.FC<PersistentMountDivProps> = ({
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

export default PersistentMountDiv;
