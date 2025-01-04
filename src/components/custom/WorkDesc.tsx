'use client';

import { getWorkData } from '@/lib/api/datadesc';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

interface WorkDescProps {
    id: any;
}

const WorkDesc: React.FC<WorkDescProps> = ({ id }) => {
    const [content, setContent] = useState<any>(null);
    let time: any;
    useEffect(() => {
        const response = async () => {
            const data = await getWorkData(id);
            setContent(data.data);
        };
        response();
    }, [id]);
    console.log(content, 'content');
    if (content) {
        time = formatDistanceToNow(new Date(content[0].created_at), {
            addSuffix: true,
        });
    }

    return content ? (
        <div className="flex flex-col justify-between gap-1 w-full p-3 bg-primarydarkbg border-[1px] border-bordersworkspace rounded-lg text-primarylightbg ">
            <div className="flex justify-between w-full">
                <h1 className="font-semibold size-4 w-fit">
                    {content[0].title}
                </h1>
                <h5 className="font-normal size-3 w-fit">{time}</h5>
            </div>
            <div className="w-full size-2 font-normal">
                <h2 className="w-full ">Work Name</h2>
            </div>
            <div className="w-full my-3 size-3 text-neutral-300">
                {content[0].description}
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export default WorkDesc;
