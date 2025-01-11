'use client';

import { useSearchParams } from 'next/navigation';
import { usePageStore } from '@/provider/PageStore';
import { Work } from '@/types/Work';
import { updateDescription } from '@/lib/client-only-api/work';

const CrewHome = () => {
    const searchParamas = useSearchParams();
    const rootWorkId: string = searchParamas.get('show') ?? '';
    const {
        server: { works },
        client: { workUpdateDraft },
    } = usePageStore(store => store);

    const { setWorks, setWorkUpdateDraft } = usePageStore(store => store);

    const currentWork: Work = works[rootWorkId];
    const work: Work = currentWork.crew?.root_work ?? currentWork;

    const description =
        (workUpdateDraft.on
            ? workUpdateDraft.data.description
            : work.description) ?? '';

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
            const response = updateDescription(workUpdateDraft.data.id, temp);
            console.log(response);
            setWorks([workUpdateDraft.data]);
            setUpdateDescriptionModeOff();
        } catch {
            setUpdateDescriptionModeOff();
        }
    };

    return (
        <div className="flex flex-col bg-primary-dark-bg w-full">
            <br />
            <br />
            <div className="flex flex-col gap-3 bg-secondary-dark-bg rounded-[10px] p-4 border-[1px] border-dark-border">
                <h2 className="text-primary-light-bg text-lg font-medium">
                    About The Crew
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
                        <p className="text-primary-light-bg text-sm font-medium">
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
        </div>
    );
};

export default CrewHome;
