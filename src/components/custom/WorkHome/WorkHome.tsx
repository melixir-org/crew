'use client';

import { useSearchParams } from 'next/navigation';

import AssignmentCard from './AssignmentCard';
import { usePageStore } from '@/provider/PageStore';
import { Assignment } from '@/types/Assignment';

const WorkHome = () => {
    const id: string = useSearchParams().get('show') ?? '';
    const work = usePageStore(store => store.works[id]);

    const description = work?.description ?? '';
    const assignment = work?.assignment ?? [];

    return (
        <div className="flex w-full bg-primary-dark-bg">
            <div className="flex flex-col bg-primary-dark-bg w-full pl-4">
                <div className="buttons">
                    <br />
                    <br />
                </div>
                <div className="flex w-full">
                    <div className="bg-secondary-dark-bg border-dark-border border-[1px] rounded-lg p-4 w-8/12 gap-4">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Description
                        </h2>

                        <div className="flex flex-col gap-2">
                            <p className="text-primary-light-bg text-sm">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="pl-3 w-96">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Assigned Senior Contributor
                        </h2>
                        {assignment.map((a: Assignment) =>
                            !a.unassigned_at ? (
                                <AssignmentCard key={a.id} data={a} />
                            ) : (
                                <></>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkHome;
