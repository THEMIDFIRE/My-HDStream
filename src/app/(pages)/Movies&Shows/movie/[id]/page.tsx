import Details from '@/app/_components/Movie&Show/shared/Details';
import { getMovieDetails } from '@/lib/api';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const details = await getMovieDetails(parseInt(id));

    return {
        title: `${details.title || 'Movie'} | My HDStream`,
        description: details.overview || 'Watch this movie on My HDStream',
        openGraph: {
            title: details.title,
            description: details.overview,
            images: details.backdrop_path
                ? [`https://image.tmdb.org/t/p/original${details.backdrop_path}`]
                : [],
        },
    };
}

export default async function MovieDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const details = await getMovieDetails(parseInt(id));

    return <Details details={details} type="movie" />;
}