'use client';

import { usePathname } from 'next/navigation';

import ReadUpdateDescription from './ReadUpdateDescription';
import CreateDescription from './CreateDescription';
import { extractWorkId } from '@/lib/utils';
import { NEW } from '@/lib/constants';
import ReadUpdateSocialLink from './SocialLink/ReadUpdateSocialLink';
import CreateSocialLink from './SocialLink/CreateSocialLink';

const CrewHome = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const crewCreateMode = workId === NEW;

    return (
        <div className="flex items-start gap-2 mt-2">
            <div className="flex-[0_0_70%]">
                {crewCreateMode ? (
                    <CreateDescription />
                ) : (
                    <ReadUpdateDescription />
                )}
            </div>
            <div className="flex-1 min-w-0">
                {crewCreateMode ? (
                    <CreateSocialLink />
                ) : (
                    <ReadUpdateSocialLink />
                )}
            </div>
        </div>
    );
};

export default CrewHome;
