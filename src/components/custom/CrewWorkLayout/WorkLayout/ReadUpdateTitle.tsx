import React from 'react';
import { usePathname } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Work } from '@/types/Work';
import { updateWorkTitleApi } from '@/lib/client-only-api';
import { extractWorkId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReadUpdateTitle = () => {
    const pathname = usePathname();

    const {
        getWorkSafe,
        setWork,
        getIsWorkUpdateDraftOn,
        setWorkUpdateDraftOn,
        setWorkUpdateDraftOff,
        getWorkUpdateDraft,
        setWorkUpdateDraft,
    } = useCrewWorkLayoutStore(store => store);

    const workId: string = extractWorkId(pathname);

    const work: Work | undefined = getWorkSafe(workId);

    const workTitle: string = getIsWorkUpdateDraftOn(workId)
        ? getWorkUpdateDraft(workId).work.title
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

    return (
        <div className="w-full flex justify-between">
            {getIsWorkUpdateDraftOn(workId) ? (
                <>
                    <Input
                        value={workTitle}
                        onChange={e =>
                            setWorkUpdateDraft(workId, workUpdateDraft => {
                                workUpdateDraft.work.title = e.target.value;
                            })
                        }
                        className="border-gray-700"
                    />
                    <div className="flex items-center">
                        <Button
                            className="text-white"
                            variant="link"
                            size="sm"
                            onClick={updateTitle}
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
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold tracking-tight text-primary-light-bg bg-primary-dark-bg">
                        {workTitle}
                    </h1>
                    <div className="flex items-center">
                        <Button
                            className="text-white"
                            variant="link"
                            size="sm"
                            onClick={() =>
                                setWorkUpdateDraftOn(workId, work as Work)
                            }
                        >
                            Edit
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ReadUpdateTitle;
