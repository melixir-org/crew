import { usePageStore } from '@/provider/PageStore';
import { usePathname } from 'next/navigation';
import { extractWorkId } from '@/lib/utils';
import { Work } from '@/types/Work';
import { createMember, Member } from '@/types/Member';
import MemberCard from './MemberCard';
import { getMemberListApi } from '@/lib/client-only-api';
import { useEffect } from 'react';
import { Crew } from '@/types/Crew';

const MembersList = () => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { crews, works },
        setCrew,
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const crewId: string = work.crew?.id ?? '';

    const crew: Crew = crews[crewId];

    useEffect(() => {
        const getMembers = async () => {
            const { data }: { data: Member[] | null } = await getMemberListApi(
                crewId
            );

            if (data) {
                setCrew(crewId, crew => {
                    crew.members = data.map(d => createMember(d));
                });
            }
        };
        getMembers();
    }, []);

    return (
        <div className="flex items-start gap-2 mt-2">
            <div className="flex-[0_0_70%]">
                {crew.members && (
                    <div className="flex flex-col gap-2">
                        {crew.members
                            .filter(m => m.left_at === null)
                            .map(m => (
                                <MemberCard
                                    key={m.id}
                                    crewId={crewId}
                                    member={m}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembersList;
