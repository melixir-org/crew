import { usePathname } from 'next/navigation';

import { extractWorkId } from '@/lib/utils';
import { usePageStore } from '@/provider/PageStore';
import { Work } from '@/types/Work';
import { updateDescriptionApi } from '@/lib/client-only-api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ReadUpdateDescription = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { works },
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        getWorkUpdateDraft,
        setWorkUpdateDraft,
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const description =
        (getIsWorkUpdateDraftOn(workId)
            ? getWorkUpdateDraft(workId).work.description
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

    return (
        <div className="bg-secondary-dark-bg rounded-lg p-2 pt-1 flex flex-col gap-2">
            <div className="h-8 flex items-center justify-between">
                <h2 className="text-primary-light-bg font-medium text-xl">
                    Description
                </h2>
                <div className="flex items-center">
                    {getIsWorkUpdateDraftOn(workId) ? (
                        <>
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={updateDescription}
                            >
                                Save
                            </Button>
                            <Button
                                className="text-white"
                                variant="link"
                                size="sm"
                                onClick={() => setWorkUpdateDraftOff(workId)}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="text-white"
                            variant="link"
                            size="sm"
                            onClick={() => setWorkUpdateDraftOn(workId, work)}
                        >
                            Edit
                        </Button>
                    )}
                </div>
            </div>
            {getIsWorkUpdateDraftOn(workId) ? (
                <Textarea
                    autoComplete={'off'}
                    spellCheck={true}
                    value={description}
                    onChange={e =>
                        setWorkUpdateDraft(workId, workUpdateDraft => {
                            workUpdateDraft.work.description = e.target.value;
                        })
                    }
                    className="h-60 border-gray-700"
                />
            ) : (
                <p className="min-h-60 text-primary-light-bg text-sm whitespace-pre-line">
                    {description}
                </p>
            )}
        </div>
    );
};

export default ReadUpdateDescription;
