'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import CrewCreateDraftLayout from './CrewCreateDraftLayout';
import RouteTabs from './RouteTabs';
import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { updateCrewTitleApi } from '@/lib/client-only-api';

interface CrewLayoutProps {
    children: React.ReactNode;
}

const CrewLayout: React.FC<CrewLayoutProps> = ({ children }) => {
    const router = useRouter();
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

    const workId: string = searchParams.get('show') ?? '';

    const work: Work | undefined = works[workId];

    const crew: Crew | undefined = crews[work?.crew?.id ?? ''];

    const crewId: string | undefined = crew?.id;

    const crewTitle: string =
        (getIsCrewUpdateDraftOn(crewId)
            ? crewUpdateDrafts[crewId].crew.title
            : crew?.title) ?? '';

    const updateTitle = async () => {
        try {
            await updateCrewTitleApi(crewId, crewTitle);
            setCrew(crewId, crew => {
                crew.title = crewTitle;
            });
            setCrewUpdateDraftOff(crewId);
        } catch {}
    };

    return (
        <>
            <div className="p-6">
                {getIsCrewUpdateDraftOn(crewId) ? (
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
                                onClick={() => setCrewUpdateDraftOff(workId)}
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
                            onClick={() => setCrewUpdateDraftOn(crewId, crew)}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
            <div className="px-6">
                <RouteTabs routes={CREW_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
                <CrewCreateDraftLayout />
            </div>
        </>
    );
};

export default CrewLayout;
