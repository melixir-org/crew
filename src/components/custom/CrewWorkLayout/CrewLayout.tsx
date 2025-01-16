'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import CrewCreateDraftLayout from './CrewCreateDraftLayout';
import RouteTabs from './RouteTabs';
import { CREW_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { updateTitleApi } from '@/lib/client-only-api/work';

interface CrewLayoutProps {
    children: React.ReactNode;
}

const CrewLayout: React.FC<CrewLayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const workId: string = searchParams.get('show') ?? '';

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const {
        server: { works, crews },
        client: { workUpdateDrafts },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        setWorkUpdateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const work: Work = useCrewWorkLayoutStore(store => {
        return store.server.works[workId];
    });
    console.log(
        useCrewWorkLayoutStore(store => {
            return store.server;
        })
    );
    console.log(workId);
    console.log(work);
    const crew: Crew = crews[work.crew?.id ?? ''];
    const rootWorkId: string = useCrewWorkLayoutStore(store => {
        return store.server.works[workId].crew?.root_work?.id ?? '';
    });
    const rootWork: Work = useCrewWorkLayoutStore(store => {
        return store.server.works[crew.root_work?.id ?? ''];
    });

    const crewTitle: string =
        (getIsWorkUpdateDraftOn(workId)
            ? workUpdateDrafts[workId].work.title
            : rootWork?.title) ?? '';

    const updateTitle = async () => {
        try {
            await updateTitleApi(workId, crewTitle);
            setWork(workId, work => {
                work.title = crewTitle;
            });
            setWorkUpdateDraftOff(workId);
        } catch {}
    };

    return (
        <>
            <div className="p-6">
                {getIsWorkUpdateDraftOn(workId) ? (
                    <div className="flex flex-col gap-2">
                        <textarea
                            rows={1}
                            value={crewTitle}
                            onChange={e =>
                                setWorkUpdateDraft(workId, workUpdateDraft => {
                                    workUpdateDraft.work.title = e.target.value;
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
                                onClick={() => setWorkUpdateDraftOff(workId)}
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
                            onClick={() =>
                                setWorkUpdateDraftOn(workId, rootWork)
                            }
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
