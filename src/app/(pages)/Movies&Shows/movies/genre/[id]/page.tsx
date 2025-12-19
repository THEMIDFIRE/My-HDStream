import { getMoviesByGenre, getMovieGenres } from '@/lib/api';
import MoviesGenreClient from './MoviesGenreClient';
import { PageProps } from '@/types/types';

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const genres = await getMovieGenres();
    const genre = genres.find((g: any) => g.id === parseInt(id));
    
    return {
        title: `${genre?.name || 'Genre'} Movies`,
        description: `Browse all ${genre?.name || ''} movies`
    };
}

export default async function GenreMoviesPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const { page: pageParam } = await searchParams;
    
    const genreId = parseInt(id);
    const currentPage = pageParam ? parseInt(pageParam) : 1;
    
    const [initialMoviesData, genres] = await Promise.all([
        getMoviesByGenre(genreId, currentPage),
        getMovieGenres()
    ]);
    
    const genre = genres.find((g: any) => g.id === genreId);

    return (
        <MoviesGenreClient 
            genreId={genreId}
            genreName={genre?.name || 'Genre'}
            initialPage={currentPage}
            initialData={initialMoviesData}
        />
    );
}