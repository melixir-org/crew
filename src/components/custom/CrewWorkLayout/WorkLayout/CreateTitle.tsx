import React from 'react';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Input } from '@/components/ui/input';

const CreateTitle = () => {
    const { getWorkCreateLayout, setWorkCreateLayout } = useCrewWorkLayoutStore(
        store => store
    );

    const workTitle = getWorkCreateLayout().work.title;

    return (
        <div className="w-full flex justify-between">
            <Input
                value={workTitle}
                onChange={e =>
                    setWorkCreateLayout(workCreateLayout => {
                        workCreateLayout.work.title = e.target.value;
                    })
                }
                className="border-gray-700"
            />
        </div>
    );
};

export default CreateTitle;
