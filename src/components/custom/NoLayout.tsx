interface NoLayoutProps {
    children: React.ReactNode;
}

const NoLayout: React.FC<NoLayoutProps> = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <>{children}</>;
};

export default NoLayout;
