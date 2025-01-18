import 'client-only';

import { supabaseBrowserClient } from '../supabase/browser';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { Child } from '@/types/Child';

export async function createCrewApi(crew: Crew) {
    return await supabaseBrowserClient
        .rpc('create_crew', { input_data: crew })
        .returns<Crew>();
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

export async function getChildrenApi({
    parentWorkId,
}: {
    parentWorkId: string;
}) {
    return await supabaseBrowserClient
        .from('hierarchy')
        .select(`child:child_id (id, title, crew:crew_id (id, title))`, {
            count: 'exact',
        })
        .range(0, 9)
        .eq('parent_id', parentWorkId)
        .returns<Child[]>();
}
