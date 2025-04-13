import React from 'react';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Input } from '@/components/ui/input';

const CreateTitle = () => {
    const { getCrewCreateLayout, setCrewCreateLayout } = useCrewWorkLayoutStore(
        store => store
    );

    const crewTitle: string = getCrewCreateLayout().crew.title;

    return (
        <div className="flex items-center justify-between">
            <Input
                value={crewTitle}
                placeholder="Enter title of crew (required)"
                onChange={e =>
                    setCrewCreateLayout(crewCreateLayout => {
                        crewCreateLayout.crew.title = e.target.value;
                    })
                }
                className="border-gray-700"
            />
        </div>
    );
};

export default CreateTitle;
