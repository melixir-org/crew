'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import RouteTabs from './RouteTabs';
import WorkCreateDraftLayout from './WorkCreateDraftLayout';
import { WORK_ROUTE_GROUP_ROUTES, WORKSPACE_ROUTE } from '@/app/routes';
import { Work } from '@/types/Work';
import { updateWorkTitleApi } from '@/lib/client-only-api';

interface WorkLayoutProps {
    children: React.ReactNode;
}

const WorkLayout: React.FC<WorkLayoutProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const workId: string = searchParams.get('show') ?? '';

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const {
        client: { workUpdateDrafts },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        setWorkUpdateDraft,
    } = useCrewWorkLayoutStore(store => store);

    console.log(
        useCrewWorkLayoutStore(store => {
            return store.server;
        })
    );

    const work: Work = useCrewWorkLayoutStore(store => {
        return store.server.works[workId];
    });

    const workTitle: string =
        (getIsWorkUpdateDraftOn(workId)
            ? workUpdateDrafts[workId].work.title
            : work?.title) ?? '';

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
        <>
            <div className="p-6 bg-primary-dark-bg">
                {getIsWorkUpdateDraftOn(workId) ? (
                    <div className="flex flex-col gap-2">
                        <textarea
                            rows={1}
                            value={workTitle}
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
                            {`${workTitle} [X]`}
                        </h1>
                        <button
                            className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                            onClick={() => setWorkUpdateDraftOn(workId, work)}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
            <div className="px-6 bg-primary-dark-bg">
                <RouteTabs routes={WORK_ROUTE_GROUP_ROUTES} />
                <div className="mt-6">{children}</div>
                <WorkCreateDraftLayout />
            </div>
        </>
    );
};

export default WorkLayout;
