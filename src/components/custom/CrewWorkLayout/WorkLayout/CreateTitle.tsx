import React from 'react';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';

const CreateTitle = () => {
    const { getWorkCreateLayout, setWorkCreateLayout } = useCrewWorkLayoutStore(
        store => store
    );

    const workTitle = getWorkCreateLayout().work.title;

    return (
        <div className="flex flex-col gap-2">
            <textarea
                rows={1}
                value={workTitle}
                onChange={e =>
                    setWorkCreateLayout(workCreateLayout => {
                        workCreateLayout.work.title = e.target.value;
                    })
                }
                className="w-full overflow-hidden resize-none text-wrap outline-none bg-primary-dark-bg text-primary-light-bg border-[1px] border-dark-border rounded-md pl-1"
            />
        </div>
    );
};

export default CreateTitle;
