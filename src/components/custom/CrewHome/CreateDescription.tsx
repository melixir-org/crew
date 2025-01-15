import { usePathname } from 'next/navigation';

import { useCrewWorkLayoutStore } from '@/provider/CrewWorkLayoutStore';

const CreateDescription = () => {
    const pathname = usePathname();
    const {
        client: { crewCreateDraft },
        setCrewCreateDraftRoute,
    } = useCrewWorkLayoutStore(store => store);

    const description =
        crewCreateDraft[pathname].crew.root_work?.description ?? '';

    return (
        <div className="flex flex-col gap-2">
            <textarea
                rows={1}
                value={description}
                onChange={e =>
                    setCrewCreateDraftRoute(pathname, route => {
                        if (route.crew.root_work) {
                            route.crew.root_work.description = e.target.value;
                        }
                    })
                }
                className="w-full overflow-hidden resize-none text-wrap outline-none bg-primary-dark-bg text-primary-light-bg border-[1px] border-dark-border rounded-md pl-1"
            />
        </div>
    );
};

export default CreateDescription;
