import Cast from '@/app/_components/Movie&Show/shared/Cast';
import Reviews from '@/app/_components/Movie&Show/shared/Reviews';
import Episodes from '@/app/_components/Movie&Show/Shows/Episodes';
import Hero from './Hero';

interface MediaDetailsProps {
    details: any;
    type: 'movie' | 'tv';
    showId?: number
}

export default function Details({ details, type }: MediaDetailsProps) {
    
    const seasons = details.seasons;
    const cast = details.credits.cast;
    const reviews = details.reviews.results;

    return (
        <>            
        <Hero details={details} type={type} />
            {type === 'tv' && (
                <>
                    <Episodes seasons={seasons} showId={details.id} />
                    <Cast cast={cast} type={type} />
                    <Reviews reviews={reviews} type={type} />
                </>
            )}
        </>
    );
}