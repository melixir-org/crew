import React from 'react';
import { usePathname } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Work } from '@/types/Work';
import { updateWorkTitleApi } from '@/lib/client-only-api';
import { extractWorkId, hasWorkUpdatePermission } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Crew } from '@/types/Crew';

const ReadUpdateTitle = () => {
    const pathname = usePathname();

    const {
        server: { user },
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

    const parentWork: Work | undefined = getWorkSafe(work?.parent_id);

    const crewId: string = work?.crew?.id ?? '';

    const crew: Crew | undefined = getCrewSafe(crewId);

    const workTitle: string = getIsWorkUpdateDraftOn(workId)
        ? getWorkUpdateDraft(workId).work.title
        : work?.title ?? '';

    const updateTitle = async () => {
        try {
            const { data }: { data: Work | null } = await updateWorkTitleApi(
                workId,
                workTitle
            );

            if (data) {
                setWork(workId, work => {
                    work.title = data.title;
                });
                setWorkUpdateDraftOff(workId);
            }
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
                    {hasWorkUpdatePermission(user, crew, parentWork) && (
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
