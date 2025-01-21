import { usePathname } from 'next/navigation';

import { extractWorkId } from '@/lib/utils';
import { usePageStore } from '@/provider/PageStore';
import { Work } from '@/types/Work';
import { updateDescriptionApi } from '@/lib/client-only-api';

const ReadUpdateDescription = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

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

    return getIsWorkUpdateDraftOn(workId) ? (
        <div className="flex flex-col gap-2">
            <textarea
                rows={1}
                value={description}
                onChange={e =>
                    setWorkUpdateDraft(workId, workUpdateDraft => {
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
                    onClick={() => setWorkUpdateDraftOff(workId)}
                >
                    Cancel
                </button>
            </div>
        </div>
    ) : (
        <div className="flex flex-col gap-2">
            <p className="text-primary-light-bg text-sm">{description}</p>
            <button
                className="border-[1px] rounded-[54px] border-dark-border text-primary-light-bg text-xs px-2 py-[2px] w-fit"
                onClick={() => setWorkUpdateDraftOn(workId, work)}
            >
                Edit
            </button>
        </div>
    );
};

export default ReadUpdateDescription;
