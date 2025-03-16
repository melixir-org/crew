import { usePageStore } from '@/provider/PageStore';
import { usePathname } from 'next/navigation';
import { extractWorkId } from '@/lib/utils';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { createMember, Member } from '@/types/Member';
import MembersCard from './MembersCard';
import { addCrewMemberApi } from '@/lib/client-only-api';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';

const MembersList = () => {
    const {
        server: { crews, works },
        setWork: setWorkPageStore,
    } = usePageStore(store => store);

    const { setWork: setWorkCrewWorkLayoutStore } = useCrewWorkLayoutStore(
        store => store
    );

    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);

    const work: Work = works[workId];

    const crewId: string = work.crew?.id ?? '';

    const crew: Crew = crews[crewId];

    const rootWorkId: string = crew.root_work?.id ?? '';

    const rootWork: Work = works[rootWorkId];

    const members: Member[] = rootWork.crew?.members ?? [];

    const currentMembers = members.filter(a => a.left_at === null);

    {
        /*const joinCrew = async () => {
        const { data }: { data: Member | null } = await joinCrewApi(crewId);
        console.log(data);
        setWorkPageStore(rootWorkId, work => {
            const a = work.crew?.members ?? [];

            a.push(createMember({ ...data }));

            work.crew!.members = a;
        });

        setWorkCrewWorkLayoutStore(rootWorkId, work => {
            const a = work.crew?.members ?? [];

            a.push(createMember({ ...data }));

            work.crew!.members = a;
        });
    };*/
    }

    return (
        <div className="flex flex-col gap-4 text-white ">
            <button className="w-fit px-2 py-2 bg-primary-light-bg text-black rounded-md">
                Join Crew
            </button>
            {currentMembers.length ? (
                <ul className="flex flex-col gap-2">
                    {currentMembers.map(member => (
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
