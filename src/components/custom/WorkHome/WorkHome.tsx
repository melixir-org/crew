'use client';

import { useSearchParams } from 'next/navigation';

import AssignmentCard from './AssignmentCard';
import { usePageStore } from '@/provider/PageStore';
import {
    updateDescriptionApi,
    updateStatusApi,
} from '@/lib/client-only-api/index';
import { Assignment } from '@/types/Assignment';
import { Work } from '@/types/Work';

const WorkHome = () => {
    const searchParams = useSearchParams();
    const workId: string = searchParams.get('show') ?? '';

    const {
        server: { works },
        client: { workUpdateDrafts },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        setWorkUpdateDraft,
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const description =
        (getIsWorkUpdateDraftOn(workId)
            ? workUpdateDrafts[workId].work.description
            : work.description) ?? '';

    const updateDescription = async () => {
        try {
            await updateDescriptionApi(workId, description);
            setWork(workId, work => {
                work.description = description;
            });
            setWorkUpdateDraftOff(workId);
        } catch {}
    };

    const updateStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus: any = e.target.value;
        try {
            await updateStatusApi(workId, newStatus);
            setWork(workId, work => {
                work.status = newStatus;
            });
        } catch {}
    };

    const assignment: Assignment[] = work.assignment ?? [];

    return (
        <div className="flex w-full bg-primary-dark-bg">
            <div className="flex flex-col bg-primary-dark-bg w-full pl-4">
                <div className="buttons">
                    <select
                        id="status"
                        name="status"
                        value={work.status}
                        onChange={updateStatus}
                        className="rounded-md bg-primary-light-bg text-black py-4 px-2 text-md outline-none"
                    >
                        <option value="TO-DO">TO-DO</option>
                        <option value="PLANNING">PLANNING</option>
                        <option value="READY">READY</option>
                        <option value="WIP">WIP</option>
                        <option value="DONE">DONE</option>
                        <option value="REVIEW">REVIEW</option>
                    </select>
                    <br />
                    <br />
                </div>
                <div className="flex w-full">
                    <div className="bg-secondary-dark-bg border-dark-border border-[1px] rounded-lg p-4 w-8/12 gap-4">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Description
                        </h2>
                        {getIsWorkUpdateDraftOn(workId) ? (
                            <div className="flex flex-col gap-2">
                                <textarea
                                    rows={1}
                                    value={description}
                                    onChange={e =>
                                        setWorkUpdateDraft(
                                            workId,
                                            workUpdateDraft => {
                                                workUpdateDraft.work.description =
                                                    e.target.value;
                                            }
                                        )
                                    }
                                    className="w-full overflow-hidden resize-none text-wrap outline-none bg-primary-dark-bg text-primary-light-bg border-[1px] border-dark-border rounded-md pl-1"
                                />
                                <div className="buttons">
                                    <button
                                        className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                                        onClick={updateDescription}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                                        onClick={() =>
                                            setWorkUpdateDraftOff(workId)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p className="text-primary-light-bg text-sm">
                                    {description}
                                </p>
                                <button
                                    className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                                    onClick={() =>
                                        setWorkUpdateDraftOn(workId, work)
                                    }
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="pl-3 w-96">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Assigned Contributors
                        </h2>
                        {assignment.map(a => (
                            <AssignmentCard key={a.id} data={a} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkHome;
