import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { WORKSPACE_ROUTE } from '@/app/routes';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { updateCrewTitleApi } from '@/lib/client-only-api';
import { extractWorkId } from '@/lib/utils';

const ReadUpdateTitle = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const {
        server: { works, crews },
        client: { crewUpdateDrafts },
        setCrew,
        getIsCrewUpdateDraftOn,
        setCrewUpdateDraftOn,
        setCrewUpdateDraftOff,
        setCrewUpdateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);

    const work: Work | undefined = works[workId] ? works[workId] : undefined;

    const crew: Crew | undefined = work
        ? crews[work.crew?.id ?? '']
        : undefined;

    const crewId: string = crew?.id ?? '';

    const crewTitle: string = getIsCrewUpdateDraftOn(crewId)
        ? crewUpdateDrafts[crewId].crew.title
        : crew?.title ?? '';

    const updateTitle = async () => {
        try {
            await updateCrewTitleApi(crewId, crewTitle);
            setCrew(crewId, crew => {
                crew.title = crewTitle;
            });
            setCrewUpdateDraftOff(crewId);
        } catch {}
    };

    return getIsCrewUpdateDraftOn(crewId) ? (
        <div className="flex flex-col gap-2">
            <textarea
                rows={1}
                value={crewTitle}
                onChange={e =>
                    setCrewUpdateDraft(crewId, crewUpdateDraft => {
                        crewUpdateDraft.crew.title = e.target.value;
                    })
                }
                className="w-full overflow-hidden resize-none text-wrap outline-none bg-primary-dark-bg text-primary-light-bg border-[1px] border-dark-border rounded-md pl-1"
            />
            <div className="buttons">
                <button
                    className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                    onClick={updateTitle}
                >
                    Save
                </button>
                <button
                    className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                    onClick={() => setCrewUpdateDraftOff(crewId)}
                >
                    Cancel
                </button>
            </div>
        </div>
    ) : (
        <div>
            <h1
                className="text-2xl font-bold tracking-tight text-primary-light-bg bg-primary-dark-bg cursor-pointer"
                onClick={handleRouteChange}
            >
                {`${crewTitle} [X]`}
            </h1>
            <button
                className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                onClick={() => setCrewUpdateDraftOn(crewId, crew as Crew)}
            >
                Edit
            </button>
        </div>
    );
};

export default ReadUpdateTitle;
