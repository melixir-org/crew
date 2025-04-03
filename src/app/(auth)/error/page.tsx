interface PageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const { error, error_code, error_description } = await searchParams;

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
