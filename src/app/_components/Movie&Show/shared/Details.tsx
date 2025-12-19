import Cast from '@/app/_components/Movie&Show/shared/Cast';
import Reviews from '@/app/_components/Movie&Show/shared/Reviews';
import Episodes from '@/app/_components/Movie&Show/Shows/Episodes';
import Hero from './Hero';
import { MediaDetailsProps } from '@/types/types';


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