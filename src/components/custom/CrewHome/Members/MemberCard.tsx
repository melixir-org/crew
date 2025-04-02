import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { removeCrewMemberApi } from '@/lib/client-only-api';
import { extractWorkId } from '@/lib/utils';
import { usePageStore } from '@/provider/PageStore';
import { createMember, Member } from '@/types/Member';
import { User } from '@/types/User';
import { Work } from '@/types/Work';
import { usePathname } from 'next/navigation';

const MembersCard = ({ user }: { user: User }) => {
    const pathname = usePathname();
    const workId: string = extractWorkId(pathname);

    const {
        server: { works },
        setCrew: setCrewPageStore,
    } = usePageStore(store => store);

    const work: Work = works[workId];

    const crewId: string = work.crew?.id ?? '';

    async function remove(crewId: string, userId: string) {
        const { data }: { data: Member | null } = await removeCrewMemberApi(
            crewId,
            userId
        );

        setCrewPageStore(crewId, crew => {
            const members = crew.members ?? [];

            const index = members.findIndex(m => m.user.id === userId);
            if (index === -1) {
                members.push(createMember({ ...data }));
            } else {
                members[index] = createMember({ ...data });
            }

            crew.members = members;
        });
    }

    return (
        <div className="p-3 flex justify-between items-center gap-2 bg-secondary-dark-bg rounded-lg">
            <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gray-100 text-black">
                        <span className="text-xs">
                            {user.name
                                .split(' ')
                                .map(t => t[0].toUpperCase())
                                .join('')
                                .slice(0, 2)}
                        </span>
                    </AvatarFallback>
                </Avatar>
                <div>
                    {user.name} ({user.username})
                </div>
            </div>
            <Button
                className="text-white"
                variant="link"
                size="sm"
                onClick={() => remove(crewId, user.id)}
            >
                Remove
            </Button>
        </div>
    );
};

export default MembersCard;
