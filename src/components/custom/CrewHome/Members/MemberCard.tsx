import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { removeCrewMemberApi } from '@/lib/client-only-api';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { usePageStore } from '@/provider/PageStore';
import { createMember, Member } from '@/types/Member';
import { DbUser } from '@/types/DbUser';

const MemberCard = ({ crewId, member }: { crewId: string; member: Member }) => {
    const { setCrew: setCrewPageStore } = usePageStore(store => store);

    const { setCrew: setCrewCrewWorkLayoutStore } = useCrewWorkLayoutStore(
        store => store
    );

    async function remove(crewId: string, userId: string) {
        const { data }: { data: Member | null } = await removeCrewMemberApi(
            crewId,
            userId
        );

        if (data) {
            setCrewPageStore(crewId, crew => {
                const members = crew.members ?? [];

                const index = members.findIndex(m => m.id === data.id);
                if (index === -1) {
                    members.push(createMember({ ...data }));
                } else {
                    members[index] = createMember({ ...data });
                }

                crew.members = members;
            });

            setCrewCrewWorkLayoutStore(crewId, crew => {
                const members = crew.members ?? [];

                const index = members.findIndex(m => m.id === data.id);
                if (index === -1) {
                    members.push(createMember({ ...data }));
                } else {
                    members[index] = createMember({ ...data });
                }

                crew.members = members;
            });
        }
    }

    const user: DbUser = member.user;

    return (
        <div className="p-3 flex justify-between items-center gap-2 bg-secondary-dark-bg rounded-lg">
            <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                    {user.avatar_url ? (
                        <AvatarImage src={user.avatar_url} />
                    ) : (
                        <AvatarFallback className="bg-gray-100 text-black">
                            <span className="text-xs">
                                {user.name
                                    .split(' ')
                                    .map(t => t[0].toUpperCase())
                                    .join('')
                                    .slice(0, 2)}
                            </span>
                        </AvatarFallback>
                    )}
                </Avatar>
                <span>
                    {user.name} ({user.username})
                </span>
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

export default MemberCard;
