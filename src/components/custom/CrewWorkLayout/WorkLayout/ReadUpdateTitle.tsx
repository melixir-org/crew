import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { WORKSPACE_ROUTE } from '@/app/routes';
import { Work } from '@/types/Work';
import { updateWorkTitleApi } from '@/lib/client-only-api';
import { extractWorkId } from '@/lib/utils';

const ReadUpdateTitle = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleRouteChange = () => {
        router.push(`${WORKSPACE_ROUTE.pathname}?${searchParams.toString()}`);
    };

    const {
        server: { works },
        client: { workUpdateDrafts },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        setWorkUpdateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);

    const work: Work | undefined = works[workId] ? works[workId] : undefined;

    const workTitle: string = getIsWorkUpdateDraftOn(workId)
        ? workUpdateDrafts[workId].work.title
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

    return getIsWorkUpdateDraftOn(workId) ? (
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
                onClick={() => setWorkUpdateDraftOn(workId, work as Work)}
            >
                Edit
            </button>
        </div>
    );
};

export default ReadUpdateTitle;
