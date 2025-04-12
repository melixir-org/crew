import { usePathname } from 'next/navigation';

import { extractPathnameAfterWorkId } from '@/lib/utils';
import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';
import { Textarea } from '@/components/ui/textarea';

const CreateDescription = () => {
    const pathname = usePathname();
    const pathnameAfterWorkId: string = extractPathnameAfterWorkId(pathname);

    const { getWorkCreateDraftRoute, setWorkCreateDraftRoute } =
        useCrewWorkLayoutStore(store => store);

    const description: string =
        getWorkCreateDraftRoute(pathnameAfterWorkId).work.description ?? '';

    return (
        <div className="bg-secondary-dark-bg rounded-lg p-2 pt-1 flex flex-col gap-2">
            <div className="h-8 flex items-center justify-between">
                <h2 className="text-primary-light-bg font-medium text-xl">
                    Description
                </h2>
            </div>
            <Textarea
                autoComplete={'off'}
                spellCheck={true}
                value={description}
                placeholder="Enter description of work (required)"
                onChange={e =>
                    setWorkCreateDraftRoute(pathnameAfterWorkId, route => {
                        route.work.description = e.target.value;
                    })
                }
                className="h-60 border-gray-700"
            />
        </div>
    );
};

export default CreateDescription;
