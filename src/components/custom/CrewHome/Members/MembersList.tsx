import { usePageStore } from '@/provider/PageStore';
import { usePathname } from 'next/navigation';
import { extractWorkId } from '@/lib/utils';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { Member } from '@/types/Member';
import MembersCard from './MembersCard';
import { addCrewMemberApi, getMemberListApi } from '@/lib/client-only-api';
import { useEffect, useState } from 'react';

const MembersList = () => {
    const [members, setMembers] = useState<Member[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const getMembers = async () => {
            const { data }: { data: Member[] | null } = await getMemberListApi(
                '3e9af1ec-a551-461e-b304-63636698a880'
            );
            console.log(data);
            setMembers(data);
            setLoading(false);
        };
        getMembers();
    }, []);
    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col gap-4 text-white ">
            <button className="w-fit px-2 py-2 bg-primary-light-bg text-black rounded-md">
                Join Crew
            </button>
            {members?.length ? (
                <ul className="flex flex-col gap-2">
                    {members.map(member => (
                        <li
                            key={member?.id}
                            className="flex flex-col gap-2 bg-secondary-dark-bg border-[1px] border-dark-border rounded-md px-3 py-2"
                        >
                            <MembersCard
                                memberId={member?.id}
                                userId={member?.user.id}
                                user={member.user}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-white">The crew is waiting for you!</div>
            )}
        </div>
    );
};

export default MembersList;
