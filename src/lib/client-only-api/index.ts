import 'client-only';

import { supabaseBrowserClient } from '../supabase/browser';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { WorkStatus } from '@/types/WorkStatus';

export async function createCrewApi(crew: Crew) {
    return await supabaseBrowserClient
        .rpc('create_crew', { input_data: crew })
        .returns<Crew>();
}

export async function createWorkApi(work: Work) {
    return await supabaseBrowserClient
        .rpc('create_work', { input_data: work })
        .returns<Work>();
}

export async function getAncestorsApi({
    workId,
    length,
}: {
    workId: string;
    length: number;
}) {
    return await supabaseBrowserClient
        .rpc('get_ancestors_with_crew', {
            work_id: workId,
            length: length,
        })
        .returns<Work[]>();
}

export async function updateDescriptionApi(
    workId: string,
    description: string
) {
    return await supabaseBrowserClient
        .from('works')
        .update({ description })
        .eq('id', workId);
}

export async function getChildrenApi({ workId }: { workId: string }) {
    return await supabaseBrowserClient
        .from('works')
        .select(`id, title, status, parent_id, crew:crew_id (id, title))`, {
            count: 'exact',
        })
        .range(0, 9)
        .eq('parent_id', workId)
        .returns<Work[]>();
}

export async function updateStatusApi(workId: string, status: WorkStatus) {
    return await supabaseBrowserClient
        .from('works')
        .update({ status })
        .eq('id', workId);
}

export async function updateWorkTitleApi(workId: string, title: string) {
    return await supabaseBrowserClient
        .from('works')
        .update({ title })
        .eq('id', workId);
}

export async function updateCrewTitleApi(crewId: string, title: string) {
    return await supabaseBrowserClient
        .from('crews')
        .update({ title })
        .eq('id', crewId);
}
