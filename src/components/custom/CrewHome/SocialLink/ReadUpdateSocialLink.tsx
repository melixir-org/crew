import { Button } from '@/components/ui/button';
import { extractWorkId } from '@/lib/utils';
import { usePageStore } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ReadUpdateSocialLink = () => {
    const {
        server: { crews, works },
    } = usePageStore(store => store);

    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);

    const work: Work = works[workId];

    const crewId: string = work.crew?.id ?? '';

    const crew: Crew = crews[crewId];

    const social_link: string | null | undefined = crew.social_link;

    return social_link ? (
        <div className="p-2 bg-secondary-dark-bg rounded-lg flex flex-col gap-2">
            <div className="h-6 flex justify-between items-center">
                <h5 className="text-primary-light-bg text-base">Join Crew!</h5>
            </div>
            <div className="flex items-center justify-between gap-2">
                <Link
                    href={social_link}
                    className="underline text-blue-500"
                    target="_blank"
                    rel="noreferrer"
                >
                    {social_link}
                </Link>
                <Button className="text-white" variant="link" size="sm">
                    Edit
                </Button>
            </div>
        </div>
    ) : null;
};

export default ReadUpdateSocialLink;
