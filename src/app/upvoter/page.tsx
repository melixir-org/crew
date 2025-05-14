import ItemList from '@/components/upvoter/item-list';
import { Item } from '@/types/Upvoter';

const mockItems: Item[] = [
    {
        id: '1',
        title: 'Next.js 14',
        subtitle: 'The React Framework for the Web',
        url: 'https://nextjs.org',
    },
    {
        id: '2',
        title: 'React 19',
        subtitle: 'A JavaScript library for building user interfaces',
        url: 'https://reactjs.org',
    },
    {
        id: '3',
        title: 'Tailwind CSS',
        subtitle: 'A utility-first CSS framework',

        url: 'https://tailwindcss.com',
    },
    {
        id: '4',
        title: 'TypeScript',
        subtitle: 'JavaScript with syntax for types',

        url: 'https://www.typescriptlang.org',
    },
    {
        id: '5',
        title: 'Vercel',
        subtitle: 'Develop. Preview. Ship.',
        url: 'https://vercel.com',
    },
];

const mockUserItem: Item = {
    id: '101',
    title: 'My Awesome Project',
    subtitle: "A project I'm working on",
    url: 'https://myproject.com',
    upvotes: 42,
};

export default function Page() {
    return (
        <main className="container mx-auto px-4 py-6 max-w-3xl">
            <div className="bg-white text-black rounded-lg shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Upvoter</h1>
                <ItemList
                    items={mockItems}
                    recentVotes={0}
                    score={20}
                    userItem={null}
                />
            </div>
        </main>
    );
}
