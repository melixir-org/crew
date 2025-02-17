import { usePathname } from 'next/navigation';

import { updateDescriptionApi } from '@/lib/client-only-api';
import { usePageStore } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { extractWorkId } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabaseBrowserClient } from '@/lib/supabase/browser';

const userId = (await supabaseBrowserClient.auth.getUser()).data.user?.id ?? '';

const ReadUpdateDescription = () => {
    const {
        server: { crews, works },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        getWorkUpdateDraft,
        setWorkUpdateDraft,
    } = usePageStore(store => store);

    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);

    const work: Work = works[workId];

    const crewId: string = work.crew?.id ?? '';

    const crew: Crew = crews[crewId];

    const rootWorkId: string = crew.root_work?.id ?? '';

    const rootWork: Work = works[rootWorkId];

    const description: string =
        (getIsWorkUpdateDraftOn(rootWorkId)
            ? getWorkUpdateDraft(rootWorkId).work.description
            : rootWork.description) ?? '';

    const updateDescription = async () => {
        try {
            await updateDescriptionApi(rootWorkId, description);
            setWork(rootWorkId, work => {
                work.description = description;
            });
            setWorkUpdateDraftOff(rootWorkId);
        } catch {}
    };

    const isUserMemberOfCrew = crew.members?.find(
        m => m.user_id === userId && m.left_at === null
    );

    return (
        <div className="bg-secondary-dark-bg rounded-lg p-2 pt-1 flex flex-col gap-2">
            <div className="h-8 flex items-center justify-between">
                <h2 className="text-primary-light-bg text-xl font-medium">
                    Description
                </h2>
                {isUserMemberOfCrew && (
                    <div className="flex items-center">
                        {getIsWorkUpdateDraftOn(rootWorkId) ? (
                            <>
                                <Button
                                    className="text-white"
                                    variant="link"
                                    size="sm"
                                    onClick={updateDescription}
                                >
                                    Save
                                </Button>
                                <Button
                                    className="text-white"
                                    variant="link"
                                    size="sm"
                                    onClick={() =>
                                        setWorkUpdateDraftOff(rootWorkId)
                                    }
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={() =>
                                    setWorkUpdateDraftOn(rootWorkId, rootWork)
                                }
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                )}
            </div>
            {getIsWorkUpdateDraftOn(rootWorkId) ? (
                <Textarea
                    autoComplete={'off'}
                    spellCheck={true}
                    value={description}
                    onChange={e =>
                        setWorkUpdateDraft(rootWorkId, workUpdateDraft => {
                            workUpdateDraft.work.description = e.target.value;
                        })
                    }
                    className="h-60 border-gray-700"
                />
            ) : (
                <p className="min-h-60 text-primary-light-bg text-sm whitespace-pre-line">
                    {description}
                </p>
            )}
        </div>
    );
};

export default ReadUpdateDescription;
