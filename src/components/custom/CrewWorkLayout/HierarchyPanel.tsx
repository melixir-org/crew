import { usePathname } from 'next/navigation';
import AncestorsPanel from './AncestorsPanel';
import ChildrenPanel from './ChildrenPanel';
import CrewCard from './CrewCard';
import { NEW } from '@/lib/constants';
import { extractWorkId } from '@/lib/utils';

const HierarchyPanel = () => {
    const pathname = usePathname();

    const workId: string = extractWorkId(pathname);

    const createCrewModeOn = workId === NEW;

    return (
        <>
            <div className="flex-[1_1_0] flex flex-col gap-1">
                <CrewCard />
                {createCrewModeOn || (
                    <div className="flex-[1_1_0] overflow-y-hidden">
                        <AncestorsPanel />
                    </div>
                )}
            </div>
            <div className="flex-[2_2_0] overflow-y-hidden">
                {createCrewModeOn || <ChildrenPanel />}
            </div>
        </>
    );
};

export default HierarchyPanel;
