'use client';

import { useSearchParams } from 'next/navigation';

import AssignmentCard from './AssignmentCard';
import { usePageStore } from '@/provider/PageStore';
import { Assignment } from '@/types/Assignment';
import { Work } from '@/types/Work';
import { updateDescription } from '@/lib/client-only-api/work';

const WorkHome = () => {
    const searchParams = useSearchParams();

    const workId: string = searchParams.get('show') ?? '';

    const {
        server: { works },
        client: { workUpdateDraft },
    } = usePageStore(store => store);

    const { setWorks, setWorkUpdateDraft } = usePageStore(store => store);

    const work: Work = works[workId];

    const description =
        (workUpdateDraft.on
            ? workUpdateDraft.data.description
            : work.description) ?? '';

    const assignment = work.assignment ?? [];

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWorkUpdateDraft(workUpdateDraft => {
            workUpdateDraft.data.description = e.target.value;
        });
    };

    const setUpdateDescriptionModeOn = () => {
        setWorkUpdateDraft(workUpdateDraft => {
            workUpdateDraft.on = true;
            workUpdateDraft.data = work;
        });
    };

    const setUpdateDescriptionModeOff = () => {
        setWorkUpdateDraft(workUpdateDraft => {
            workUpdateDraft.on = false;
        });
    };

    const saveDescription = () => {
        try {
            const temp = workUpdateDraft.data.description ?? description;
            updateDescription(workId, temp);
            setWorks([workUpdateDraft.data]);
            setUpdateDescriptionModeOff();
        } catch {
            setUpdateDescriptionModeOff();
        }
    };

    return (
        <div className="flex w-full bg-primary-dark-bg">
            <div className="flex flex-col bg-primary-dark-bg w-full pl-4">
                <div className="buttons">
                    <br />
                    <br />
                </div>
                <div className="flex w-full">
                    <div className="bg-secondary-dark-bg border-dark-border border-[1px] rounded-lg p-4 w-8/12 gap-4">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Description
                        </h2>
                        {workUpdateDraft.on ? (
                            <div className="flex flex-col gap-2">
                                <textarea
                                    rows={1}
                                    value={description}
                                    onChange={handleChange}
                                    className="w-full overflow-hidden resize-none text-wrap outline-none bg-primary-dark-bg text-primary-light-bg border-[1px] border-dark-border rounded-md pl-1"
                                />
                                <div className="buttons">
                                    <button
                                        className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                                        onClick={saveDescription}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                                        onClick={setUpdateDescriptionModeOff}
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
                                    onClick={setUpdateDescriptionModeOn}
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
                        {assignment.map((a: Assignment) => (
                            <AssignmentCard key={a.id} data={a} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkHome;
