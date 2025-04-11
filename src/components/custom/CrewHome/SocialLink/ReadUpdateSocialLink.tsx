import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateCrewSocialLinkApi } from '@/lib/client-only-api';
import { extractWorkId, hasCrewUpdatePermission } from '@/lib/utils';
import { usePageStore } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ReadUpdateSocialLink = () => {
    const {
        server: { crews, works, user },
        setCrew,
        getIsCrewUpdateDraftOn,
        setCrewUpdateDraftOn,
        setCrewUpdateDraftOff,
        getCrewUpdateDraft,
        setCrewUpdateDraft,
    } = usePageStore(store => store);

    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);

    const work: Work = works[workId];

    const crewId: string = work.crew?.id ?? '';

    const crew: Crew = crews[crewId];

    const social_link: string = getIsCrewUpdateDraftOn(crewId)
        ? getCrewUpdateDraft(crewId).crew.social_link ?? ''
        : crew.social_link ?? '';

    const updateSocialLink = async () => {
        try {
            const { data }: { data: Crew | null } =
                await updateCrewSocialLinkApi(crewId, social_link);

            if (data) {
                setCrew(crewId, crew => {
                    crew.social_link = data.social_link;
                });
                setCrewUpdateDraftOff(crewId);
            }
        } catch {}
    };

    return (
        <div className="p-2 bg-secondary-dark-bg rounded-lg flex flex-col gap-2">
            <div className="h-6 flex justify-between items-center">
                <h5 className="text-primary-light-bg text-base">Join Crew!</h5>
            </div>
            <div className="h-9 flex items-center justify-between gap-2">
                {getIsCrewUpdateDraftOn(crewId) ? (
                    <>
                        <Input
                            value={social_link}
                            onChange={e =>
                                setCrewUpdateDraft(crewId, crewUpdateDraft => {
                                    crewUpdateDraft.crew.social_link =
                                        e.target.value;
                                })
                            }
                            className="border-gray-700"
                        />
                        <div className="flex items-center">
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={updateSocialLink}
                            >
                                Save
                            </Button>
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={() => setCrewUpdateDraftOff(crewId)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {social_link ? (
                            <Link
                                href={social_link}
                                className="min-w-0 text-blue-600 underline truncate"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {social_link}
                            </Link>
                        ) : (
                            <span>no link</span>
                        )}
                        {hasCrewUpdatePermission(user, crew) && (
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={() => {
                                    setCrewUpdateDraftOn(crewId, crew);
                                }}
                            >
                                Edit
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ReadUpdateSocialLink;
