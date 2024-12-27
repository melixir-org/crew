'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CREW_ROUTE, WORK_ROUTE } from '../routes';
import { useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const items = [
    {
        id: '1',
        title: 'Project Management',
        subtitle: 'Organize and track team progress',
    },
    {
        id: '2',
        title: 'Task Automation',
        subtitle: 'Streamline repetitive workflows',
    },
    {
        id: '3',
        title: 'Data Analytics',
        subtitle: 'Gain insights from your business data',
    },
    {
        id: '4',
        title: 'Customer Support',
        subtitle: 'Provide excellent service to your clients',
    },
    {
        id: '5',
        title: 'Team Collaboration',
        subtitle: 'Enhance communication and productivity',
    },
];

function Workspace() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('type', type);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const pageIndex = searchParams.get('page_index') || '0';
    const pageSize = searchParams.get('page_size') || '10';
    const type = searchParams.get('type') || 'work';

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page_index', pageIndex.toString());
        params.set('page_size', pageSize.toString());
        params.set('type', type);
        router.replace(`${pathname}?${params.toString()}`);
    }, []);

    const handleItemClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('entry', id);
        params.set('show', id);
        params.set('h', id);
        if (type === 'work') {
            params.set('panel', 'h');
            router.push(`${WORK_ROUTE.pathname}?${params.toString()}`);
        } else {
            params.set('panel', 'm');
            router.push(`${CREW_ROUTE.pathname}?${params.toString()}`);
        }
    };

    const entry = searchParams.get('entry');

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">{type} list</h1>
            <Tabs
                value={type}
                onValueChange={value => handleTypeChange(value)}
                className="w-full"
            >
                <TabsList className="bg-zinc-900 border border-zinc-800">
                    {['crew', 'work'].map(t => (
                        <TabsTrigger
                            key={t}
                            value={t}
                            className="data-[state=active]:bg-zinc-800"
                        >
                            {t}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <ul className="space-y-4">
                {items.map(item => (
                    <li key={item.id}>
                        <Card
                            className={`cursor-pointer transition-colors ${
                                entry === item.id
                                    ? 'bg-primary text-primary-foreground'
                                    : ''
                            }`}
                            onClick={() => handleItemClick(item.id)}
                        >
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p
                                    className={
                                        entry === item.id
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground'
                                    }
                                >
                                    {item.subtitle}
                                </p>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Workspace;
