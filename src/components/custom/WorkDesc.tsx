'use client';

import { updateDescription } from '@/lib/client-only-api/work';
import AssignmentCard from './AssignmentCard';
import { usePageStore } from '@/provider/PageStore';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const WorkDesc = () => {
    const id: any = useSearchParams().get('show');
    const result = usePageStore(store => store.works[id]);

    const [editing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<any>(result.description);
    const [initialText, setInitialText] = useState<string>(text);

    const toggleEditing = () => {
        setEditing(!editing);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const handleSave = () => {
        updateDescription(id, text);
        setEditing(false);
    };
    const handleCancel = () => {
        setText(initialText);
        setEditing(false);
    };
    return result ? (
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
                        {editing ? (
                            <div className="w-full">
                                <textarea
                                    rows={1}
                                    cols={50}
                                    className="bg-secondary-dark-bg border-[1px] border-dark-border w-full resize-none text-sm outline-none rounded-sm px-1"
                                    value={text}
                                    onChange={handleChange}
                                    autoFocus
                                />
                                <div className="flex gap-1">
                                    <button
                                        className="text-xs text-primary-light-bg px-2 py-1 rounded-[54px] border-[1px] border-dark-border bg-secondary-dark-bg"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="text-xs text-primary-light-bg px-2 py-1 rounded-[54px] border-[1px] border-dark-border"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p className="text-primary-light-bg text-sm">
                                    {text}
                                </p>
                                <button
                                    className="text-xs text-primary-light-bg px-2 py-1 rounded-[54px] border-[1px] border-dark-border w-fit"
                                    onClick={toggleEditing}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="pl-3 w-96">
                        <h2 className="text-primary-light-bg font-medium text-xl">
                            Assigned Senior Contributor
                        </h2>
                        {/*assignments?.map((assignment: any, index: number) => (
                            <AssignmentCard key={index} data={assignment} />
                        ))*/}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div></div>
    );
};

export default WorkDesc;
