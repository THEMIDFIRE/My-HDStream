import { getShowsByGenre, getShowsGenres } from '@/lib/api';
import ShowsGenreClient from './ShowsGenreClient';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const genres = await getShowsGenres();
    const genre = genres.find((g: any) => g.id === parseInt(id));
    
    return {
        title: `${genre?.name || 'Genre'} Shows`,
        description: `Browse all ${genre?.name || ''} Shows`
    };
}

export default async function GenreShowsPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { page: pageParam } = await searchParams;
    
    const genreId = parseInt(id);
    const currentPage = pageParam ? parseInt(pageParam) : 1;
    
    const [initialShowsData, genres] = await Promise.all([
        getShowsByGenre(genreId, currentPage),
        getShowsGenres()
    ]);
    
    const genre = genres.find((g: any) => g.id === genreId);

    return (
        <ShowsGenreClient
            genreId={genreId}
            genreName={genre?.name || 'Genre'}
            initialPage={currentPage}
            initialData={initialShowsData}
        />
    );
}