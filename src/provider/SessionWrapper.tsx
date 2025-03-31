'use client';

import { useCrewWorkLayoutStore } from './CrewWorkLayoutStore';
import Session from './Session';

export function SyncSessionIntoCrewWorkLayoutStore() {
    const { setServer } = useCrewWorkLayoutStore(store => store);

    return (
        <Session
            callback={user => {
                setServer(server => {
                    server.user = user;
                });
            }}
        />
    );
}

export default function SessionWrapper({
    syncSessionIntoCrewWorkLayoutStore = true,
}: {
    syncSessionIntoCrewWorkLayoutStore?: boolean;
}) {
    return syncSessionIntoCrewWorkLayoutStore ? (
        <SyncSessionIntoCrewWorkLayoutStore />
    ) : (
        <Session />
    );
}
