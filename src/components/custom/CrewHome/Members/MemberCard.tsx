import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { removeCrewMemberApi } from '@/lib/client-only-api';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { usePageStore } from '@/provider/PageStore';
import { createMember, Member } from '@/types/Member';
import { DbUser } from '@/types/DbUser';
import { hasCrewUpdatePermission } from '@/lib/utils';
import { Crew } from '@/types/Crew';

const MemberCard = ({ crewId, member }: { crewId: string; member: Member }) => {
    const {
        server: { user, crews },
        setCrew: setCrewPageStore,
    } = usePageStore(store => store);

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

    const mu: DbUser = member.user;

    const crew: Crew = crews[crewId];

    return (
        <div className="p-3 flex justify-between items-center gap-2 bg-secondary-dark-bg rounded-lg">
            <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                    {mu.avatar_url ? (
                        <AvatarImage src={mu.avatar_url} />
                    ) : (
                        <AvatarFallback className="bg-gray-100 text-black">
                            <span className="text-xs">
                                {mu.name
                                    .split(' ')
                                    .map(t => t[0].toUpperCase())
                                    .join('')
                                    .slice(0, 2)}
                            </span>
                        </AvatarFallback>
                    )}
                </Avatar>
                <span>
                    {mu.name} ({mu.username})
                </span>
            </div>
            {hasCrewUpdatePermission(user, crew) && (
                <Button
                    className="text-white"
                    variant="link"
                    size="sm"
                    onClick={() => remove(crewId, mu.id)}
                >
                    Remove
                </Button>
            )}
        </div>
    );
};

export default MemberCard;
