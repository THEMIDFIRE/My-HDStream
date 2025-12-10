// app/Movies&Shows/movie/[id]/page.tsx
import { getMovieDetails } from '@/lib/api';

interface PageProps {
    params: Promise<{ id: number }>;
}

export default async function MovieDetails({ params }: PageProps) {
    const { id } = await params;
    const movieId = id;
    const details = await getMovieDetails(movieId);
    
    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-white">{details?.title}</h1>
                <p className="text-gray-300 mt-4">{details?.overview}</p>
                {/* Add more movie details here */}
            </div>
        </div>
    )
}