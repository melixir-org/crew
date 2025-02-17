import React from 'react';
import { usePathname } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Work } from '@/types/Work';
import { updateWorkTitleApi } from '@/lib/client-only-api';
import { extractWorkId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Crew } from '@/types/Crew';
import { supabaseBrowserClient } from '@/lib/supabase/browser';

const userId = (await supabaseBrowserClient.auth.getUser()).data.user?.id ?? '';

const ReadUpdateTitle = () => {
    const pathname = usePathname();

    const {
        getWorkSafe,
        getCrewSafe,
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        getWorkUpdateDraft,
        setWorkUpdateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);

    const work: Work | undefined = getWorkSafe(workId);

    const crewId: string = work?.crew?.id ?? '';

    const crew: Crew | undefined = getCrewSafe(crewId);

    const isUserMemberOfCrew = crew?.members?.find(
        m => m.user_id === userId && m.left_at === null
    );

    const workTitle: string = getIsWorkUpdateDraftOn(workId)
        ? getWorkUpdateDraft(workId).work.title
        : work?.title ?? '';

    const updateTitle = async () => {
        try {
            await updateWorkTitleApi(workId, workTitle);
            setWork(workId, work => {
                work.title = workTitle;
            });
            setWorkUpdateDraftOff(workId);
        } catch {}
    };

    return (
        <div className="flex items-center justify-between">
            {getIsWorkUpdateDraftOn(workId) ? (
                <>
                    <Input
                        value={workTitle}
                        onChange={e =>
                            setWorkUpdateDraft(workId, workUpdateDraft => {
                                workUpdateDraft.work.title = e.target.value;
                            })
                        }
                        className="border-gray-700"
                    />
                    <div className="flex items-center">
                        <Button
                            className="text-white"
                            variant="link"
                            size="sm"
                            onClick={updateTitle}
                        >
                            Save
                        </Button>
                        <Button
                            className="text-white"
                            variant="link"
                            size="sm"
                            onClick={() => setWorkUpdateDraftOff(workId)}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold tracking-tight text-primary-light-bg bg-primary-dark-bg">
                        {workTitle}
                    </h1>
                    {isUserMemberOfCrew && (
                        <div className="flex items-center">
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={() =>
                                    setWorkUpdateDraftOn(workId, work as Work)
                                }
                            >
                                Edit
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ReadUpdateTitle;
