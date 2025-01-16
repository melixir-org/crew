'use client';

import { useSearchParams } from 'next/navigation';
import { usePageStore } from '@/provider/PageStore';
import { Work } from '@/types/Work';

const CrewHome = () => {
    const searchParamas = useSearchParams();
    const rootWorkId: string = searchParamas.get('show') ?? '';
    const {
        server: { works },
        client: { workUpdateDraft },
    } = usePageStore(store => store);

    const { setWorks, setWorkUpdateDraft } = usePageStore(store => store);

    const work: Work = works[rootWorkId];

    const description =
        (workUpdateDraft.on
            ? workUpdateDraft.data.description
            : work.description) ?? '';

    return (
        <div className="container">
            <br />
            <br />
            <div className="desc">
                <h2>About The Crew</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CrewHome;
