import { usePathname } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { extractPathnameAfterWorkId } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const CreateDescription = () => {
    const pathname = usePathname();

    const pathnameAfterWorkId: string = extractPathnameAfterWorkId(pathname);

    const { getCrewCreateDraftRoute, setCrewCreateDraftRoute } =
        useCrewWorkLayoutStore(store => store);

    const description: string =
        getCrewCreateDraftRoute(pathnameAfterWorkId).crew.root_work
            ?.description ?? '';

    return (
        <div className="bg-secondary-dark-bg rounded-lg p-2 pt-1 flex flex-col gap-2">
            <div className="h-8 flex items-center justify-between">
                <h2 className="text-primary-light-bg text-xl font-medium">
                    Description
                </h2>
            </div>
            <Textarea
                autoComplete={'off'}
                spellCheck={true}
                value={description}
                onChange={e =>
                    setCrewCreateDraftRoute(pathnameAfterWorkId, route => {
                        if (route.crew.root_work) {
                            route.crew.root_work.description = e.target.value;
                        }
                    })
                }
                className="h-60 border-gray-700"
            />
        </div>
    );
};

export default CreateDescription;
