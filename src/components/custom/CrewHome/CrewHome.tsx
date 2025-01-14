'use client';

import { useSearchParams } from 'next/navigation';

import { CREW } from '@/lib/constants';
import ReadUpdateDescription from './ReadUpdateDescription';
import CreateDescription from './CreateDescription';

const CrewHome = () => {
    const searchParams = useSearchParams();
    const createMode = searchParams.get('create_mode');
    return (
        <div className="flex flex-col bg-primary-dark-bg w-full">
            <br />
            <div className="flex flex-col gap-3 bg-secondary-dark-bg rounded-[10px] p-4 border-[1px] border-dark-border">
                <h2 className="text-primary-light-bg text-lg font-medium">
                    About The Crew
                </h2>
                {createMode === CREW ? (
                    <CreateDescription />
                ) : (
                    <ReadUpdateDescription />
                )}
            </div>
        </div>
    );
};

export default CrewHome;
