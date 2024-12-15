interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            Left Panel
            <div>{children}</div>
        </div>
    );
};

export default Layout;
