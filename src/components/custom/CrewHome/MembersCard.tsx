import { usePageStore } from '@/provider/PageStore';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { createMember, Member } from '@/types/Member';
import { removeCrewMemberApi } from '@/lib/client-only-api';
import { usePathname } from 'next/navigation';
import { extractWorkId } from '@/lib/utils';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';

const MembersCard = ({
    memberId,
    userId,
}: {
    memberId: string;
    userId: string;
}) => {
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

    async function removeMember() {
        const { data }: { data: Member | null } = await removeCrewMemberApi(
            crewId,
            userId
        );

        setWorkPageStore(rootWorkId, work => {
            const a = work.crew?.members ?? [];

            const index = a.findIndex(t => t.id === memberId);
            if (index === -1) {
                a.push(createMember({ ...data }));
            } else {
                a[index] = createMember({ ...data });
            }

            work.crew!.members = a;
        });

        setWorkCrewWorkLayoutStore(rootWorkId, work => {
            const a = work.crew?.members ?? [];

            const index = a.findIndex(t => t.id === memberId);
            if (index === -1) {
                a.push(createMember({ ...data }));
            } else {
                a[index] = createMember({ ...data });
            }

            work.crew!.members = a;
        });
    }

    return (
        <div className="flex flex-col gap-2 bg-secondary-dark-bg border-[1px] border-dark-border rounded-md px-3 py-2">
            {userId}
            <button className="w-fit" onClick={() => removeMember()}>
                Remove
            </button>
        </div>
    );
};

export default MembersCard;
