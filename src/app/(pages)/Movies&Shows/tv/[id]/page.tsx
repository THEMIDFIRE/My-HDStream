import Details from '@/app/_components/Movie&Show/shared/Details';
import { getShowDetails } from '@/lib/api';
import { PageProps } from '@/types/types';
import { cache } from 'react';

// Cache the API call to prevent duplicate requests
const getCachedShowDetails = cache(async (id: number) => {
    return await getShowDetails(id);
});

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const details = await getCachedShowDetails(parseInt(id));

    return {
        title: `${details.name || 'Show'} | My HDStream`,
        description: details.overview || 'Watch this Show on My HDStream',
        openGraph: {
            title: details.name,
            description: details.overview,
            images: details.backdrop_path
                ? [`https://image.tmdb.org/t/p/original${details.backdrop_path}`]
                : [],
        },
    };
}

export default async function ShowDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const details = await getCachedShowDetails(parseInt(id));

    return <Details details={details} type="tv" />;
}