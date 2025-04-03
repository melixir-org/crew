import React from 'react';
import { usePathname } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { updateCrewTitleApi } from '@/lib/client-only-api';
import { extractWorkId, hasCrewUpdatePermission } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ReadUpdateTitle = () => {
    const pathname = usePathname();

    const {
        server: { user },
        getCrewSafe,
        setCrew,
        getWorkSafe,
        getIsCrewUpdateDraftOn,
        setCrewUpdateDraftOn,
        setCrewUpdateDraftOff,
        getCrewUpdateDraft,
        setCrewUpdateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);

    const work: Work | undefined = getWorkSafe(workId);

    const crew: Crew | undefined = getCrewSafe(work?.crew?.id);

    const crewId: string = crew?.id ?? '';

    const crewTitle: string = getIsCrewUpdateDraftOn(crewId)
        ? getCrewUpdateDraft(crewId).crew.title
        : crew?.title ?? '';

    const updateTitle = async () => {
        try {
            const { data }: { data: Crew | null } = await updateCrewTitleApi(
                crewId,
                crewTitle
            );

            if (data) {
                setCrew(crewId, crew => {
                    crew.title = data.title;
                });
                setCrewUpdateDraftOff(crewId);
            }
        } catch {}
    };

    return (
        <div className="flex items-center justify-between">
            {getIsCrewUpdateDraftOn(crewId) ? (
                <>
                    <Input
                        value={crewTitle}
                        onChange={e =>
                            setCrewUpdateDraft(crewId, crewUpdateDraft => {
                                crewUpdateDraft.crew.title = e.target.value;
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
                            onClick={() => setCrewUpdateDraftOff(crewId)}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold tracking-tight text-primary-light-bg bg-primary-dark-bg">
                        {crewTitle}
                    </h1>
                    {hasCrewUpdatePermission(user, crew) && (
                        <div className="flex items-center">
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={() =>
                                    setCrewUpdateDraftOn(crewId, crew as Crew)
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
