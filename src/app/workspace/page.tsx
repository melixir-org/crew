import Workspace from '@/components/custom/Workspace';
import { PageStoreProvider } from '@/provider/PageStore';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
    const show = (await searchParams).show;

    return (
        <PageStoreProvider>
            <Workspace />
        </PageStoreProvider>
    );
};

export default Page;
