import 'client-only';

import { supabaseBrowserClient } from '../supabase/browser';
import { Work } from '@/types/Work';
import { Crew } from '@/types/Crew';
import { WorkStatus } from '@/types/WorkStatus';
import { Assignment } from '@/types/Assignment';
import { Member } from '@/types/Member';

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

export async function getWorksForCrewApi({
    crewId,
    search,
}: {
    crewId: string;
    search: string;
}) {
    return await supabaseBrowserClient
        .from('works')
        .select(
            `id, title, status, parent_id, crew:crew_id (id, title), assignments (id, user:user_id (id, username, name, avatar_url), assigned_at, unassigned_at)`,
            {
                count: 'exact',
            }
        )
        .range(0, 15)
        .eq('crew_id', crewId)
        .is('assignments.unassigned_at', null)
        .or(`title.ilike.%${search}%,description.ilike.%${search}%`)
        .order('status', { ascending: true })
        .returns<Work[]>();
}

export async function updateDescriptionApi(
    workId: string,
    description: string
) {
    return await supabaseBrowserClient
        .from('works')
        .update({ description })
        .eq('id', workId)
        .select()
        .returns<Work[]>()
        .single();
}

export async function getChildrenApi({
    workId,
    search,
}: {
    workId: string;
    search: string;
}) {
    return await supabaseBrowserClient
        .from('works')
        .select(
            `id, title, status, parent_id, crew:crew_id (id, title), assignments (id, user:user_id (id, username, name, avatar_url), assigned_at, unassigned_at)`,
            {
                count: 'exact',
            }
        )
        .range(0, 9)
        .eq('parent_id', workId)
        .is('assignments.unassigned_at', null)
        .or(`title.ilike.%${search}%,description.ilike.%${search}%`)
        .order('status', { ascending: true })
        .returns<Work[]>();
}

export async function updateStatusApi(workId: string, status: WorkStatus) {
    return await supabaseBrowserClient
        .from('works')
        .update({ status })
        .eq('id', workId)
        .select()
        .returns<Work[]>()
        .single();
}

export async function updateWorkTitleApi(workId: string, title: string) {
    return await supabaseBrowserClient
        .from('works')
        .update({ title })
        .eq('id', workId)
        .select()
        .returns<Work[]>()
        .single();
}

export async function updateCrewTitleApi(crewId: string, title: string) {
    return await supabaseBrowserClient
        .from('crews')
        .update({ title })
        .eq('id', crewId)
        .select()
        .returns<Crew[]>()
        .single();
}

export async function assignWorkApi(workId: string, userId: string) {
    return await supabaseBrowserClient
        .rpc('assign_work', {
            input_data: { work_id: workId, user_id: userId },
        })
        .returns<Assignment>();
}

export async function unassignWorkApi(workId: string, userId: string) {
    return await supabaseBrowserClient
        .rpc('unassign_work', {
            input_data: { work_id: workId, user_id: userId },
        })
        .returns<Assignment>();
}

export async function removeCrewMemberApi(crewId: string, userId: string) {
    return await supabaseBrowserClient
        .rpc('remove_crew_member', {
            input_data: { crew_id: crewId, user_id: userId },
        })
        .returns<Member>();
}

export async function addCrewMemberApi(crewId: string, userId: string) {
    return await supabaseBrowserClient
        .rpc('add_crew_member', {
            input_data: { crewId: crewId, userId: userId },
        })
        .returns<Member>();
}

export async function getMemberListApi(crewId: string) {
    return await supabaseBrowserClient
        .from('members')
        .select('id, joined_at, user:user_id (id, username, name, avatar_url)')
        .eq('crew_id', crewId)
        .filter('left_at', 'is', null)
        .limit(20)
        .returns<Member[]>();
}
