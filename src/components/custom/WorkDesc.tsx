'use client';

import { getWorkData } from '@/lib/client-only-api/work';
import getRelativeTime from '@/lib/client-only-api/datatime';
import { useEffect, useState } from 'react';
import Panel from './CrewWorkLayout/Panel';

interface WorkDescProps {
    id: string;
}

const WorkDesc: React.FC<WorkDescProps> = ({ id }) => {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        const response = async () => {
            const data = await getWorkData(id);
            setContent(data.data);
        };
        response();
    }, [id]);

    const time: any = content
        ? getRelativeTime(content[0].created_at)
        : 'fetching';

    return content ? (
        <div className="flex w-full">
            <div className='w-3/12 flex justify-center items-center'><Panel/></div>
            <div className="flex flex-col bg-primary-dark-bg w-full pl-4">
                <div className="w-full">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-primary-light-bg font-semibold text-3xl">
                            {content[0].title}
                        </h1>
                        <h3>{time}</h3>
                    </div>
                    <div className="buttons"><br/><br/></div>
                </div>
                <div className="flex w-full">
                    <div className="bg-secondary-dark-bg border-dark-border border-[1px] rounded-lg p-4 w-8/12 gap-4">
                        <h2 className='text-primary-light-bg font-medium text-xl'>Main Work Description</h2>
                        <p className='text-primary-light-bg text-sm'>{content[0].description}</p>
                    </div>
                    <div className="right">
                        <h2 className='text-primary-light-bg font-medium text-xl'>Assigned Senior Contributor</h2>
                        <div className="banner">Rishabh</div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export default WorkDesc;
