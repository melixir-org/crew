'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WORK_ROUTE } from '../routes';
import { useEffect } from 'react';

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

    const handlePagination = (pageIndex: number, pageSize: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page_index', pageIndex.toString());
        params.set('page_size', pageSize.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    const pageIndex = searchParams.get('page_index') || '0';
    const pageSize = searchParams.get('page_size') || '10';

    useEffect(() => {
        handlePagination(Number(pageIndex), Number(pageSize));
    }, []);

    const handleItemClick = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('entry', id);
        params.set('show', id);
        params.set('panel', 'h');
        params.set('h', id);
        router.push(`${WORK_ROUTE.pathname}?${params.toString()}`);
    };

    const entry = searchParams.get('entry');

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Work List</h1>
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
