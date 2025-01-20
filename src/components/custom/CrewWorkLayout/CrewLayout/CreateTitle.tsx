import React from 'react';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';

const CreateTitle = () => {
    const { getCrewCreateLayout, setCrewCreateLayout } = useCrewWorkLayoutStore(
        store => store
    );

    const crewTitle: string = getCrewCreateLayout().crew.title;

    return (
        <div className="flex flex-col gap-2">
            <textarea
                rows={1}
                value={crewTitle}
                onChange={e =>
                    setCrewCreateLayout(crewCreateLayout => {
                        crewCreateLayout.crew.title = e.target.value;
                    })
                }
                className="w-full overflow-hidden resize-none text-wrap outline-none bg-primary-dark-bg text-primary-light-bg border-[1px] border-dark-border rounded-md pl-1"
            />
        </div>
    );
};

export default CreateTitle;
