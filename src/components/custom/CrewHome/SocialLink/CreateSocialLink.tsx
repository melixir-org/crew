import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { extractPathnameAfterWorkId } from '@/lib/utils';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { usePathname } from 'next/navigation';

const CreateSocialLink = () => {
    const pathname = usePathname();

    const pathnameAfterWorkId: string = extractPathnameAfterWorkId(pathname);

    const { getCrewCreateDraftRoute, setCrewCreateDraftRoute } =
        useCrewWorkLayoutStore(store => store);

    const social_link: string =
        getCrewCreateDraftRoute(pathnameAfterWorkId).crew.social_link ?? '';

    return (
        <div className="p-2 bg-secondary-dark-bg rounded-lg flex flex-col gap-2">
            <div className="h-6 flex justify-between items-center">
                <h5 className="text-primary-light-bg text-base">Join Crew!</h5>
            </div>
            <div className="flex items-center justify-between gap-2">
                <Input
                    value={social_link}
                    placeholder="Enter crew's discord or slack group link (optional)"
                    onChange={e =>
                        setCrewCreateDraftRoute(pathnameAfterWorkId, route => {
                            route.crew.social_link = e.target.value;
                        })
                    }
                    className="border-gray-700"
                />
            </div>
        </div>
    );
};

export default CreateSocialLink;
