import { usePathname } from 'next/navigation';

import { updateDescriptionApi } from '@/lib/client-only-api';
import { usePageStore } from '@/provider/PageStore';
import { Crew } from '@/types/Crew';
import { Work } from '@/types/Work';
import { extractWorkId } from '@/lib/utils';

const ReadUpdateDescription = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { crews, works },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        getWorkUpdateDraft,
        setWorkUpdateDraft,
    } = usePageStore(store => store);

    const crew: Crew = crews[works[workId].crew?.id ?? ''];
    const rootWork: Work = works[crew.root_work?.id ?? ''];

    const description: string =
        (getIsWorkUpdateDraftOn(rootWork.id)
            ? getWorkUpdateDraft(rootWork.id).work.description
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

    return getIsWorkUpdateDraftOn(rootWork.id) ? (
        <div className="flex flex-col gap-2">
            <textarea
                rows={1}
                value={description}
                onChange={e =>
                    setWorkUpdateDraft(rootWork.id, workUpdateDraft => {
                        workUpdateDraft.work.description = e.target.value;
                    })
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
                    onClick={() => setWorkUpdateDraftOff(rootWork.id)}
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
                onClick={() => setWorkUpdateDraftOn(rootWork.id, rootWork)}
            >
                Edit
            </button>
        </div>
    );
};

export default ReadUpdateDescription;
