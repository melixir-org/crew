'use client';

import { useSearchParams } from 'next/navigation';

import { usePageStore } from '@/provider/PageStore';
import { updateDescriptionApi } from '@/lib/client-only-api/work';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';

const CrewHome = () => {
    const searchParamas = useSearchParams();
    const workId: string = searchParamas.get('show') ?? '';

    const {
        server: { crews, works },
        client: { workUpdateDrafts },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        setWorkUpdateDraft,
    } = usePageStore(store => store);

    const crew: Crew = crews[works[workId].crew?.id ?? ''];
    const rootWork: Work = works[crew.root_work?.id ?? ''];

    const description =
        (getIsWorkUpdateDraftOn(rootWork.id)
            ? workUpdateDrafts[rootWork.id].data.description
            : rootWork.description) ?? '';

    const updateDescription = async () => {
        try {
            await updateDescriptionApi(rootWork.id, description);
            setWork(rootWork.id, work => {
                work.description = description;
            });
            setWorkUpdateDraftOff(rootWork.id);
        } catch {}
    };

    return (
        <div className="flex flex-col bg-primary-dark-bg w-full">
            <br />
            <br />
            <div className="flex flex-col gap-3 bg-secondary-dark-bg rounded-[10px] p-4 border-[1px] border-dark-border">
                <h2 className="text-primary-light-bg text-lg font-medium">
                    About The Crew
                </h2>
                {getIsWorkUpdateDraftOn(rootWork.id) ? (
                    <div className="flex flex-col gap-2">
                        <textarea
                            rows={1}
                            value={description}
                            onChange={e =>
                                setWorkUpdateDraft(
                                    rootWork.id,
                                    workUpdateDraft => {
                                        workUpdateDraft.data.description =
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
                                    setWorkUpdateDraftOff(rootWork.id)
                                }
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
                            onClick={() =>
                                setWorkUpdateDraftOn(rootWork.id, rootWork)
                            }
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
