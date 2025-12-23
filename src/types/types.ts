// Common types
export interface HeroLogoProps {
    className?: string;
    width?: number | string;
    height?: number | string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenreCardProps {
    genre: {
        id: number;
        name: string;
    };
    type?: 'movie' | 'tv';
}


export interface GenresCarouselProps {
    genres: any[];
    type: 'movie' | 'tv';
}

export interface CarouselSectionProps {
    items: any[];
    title: string;
    type: 'movie' | 'tv';
}

export interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string }>;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path?: string;
    origin_country: string;
}

export interface Credits {
    cast?: Array<{
        id: number;
        name: string;
        original_name: string;
        character: string;
        profile_path?: string;
        order: number;
        [key: string]: any;
    }>;
    crew?: Array<{
        id: number;
        name: string;
        job: string;
        department: string;
        profile_path?: string;
        [key: string]: any;
    }>;
}

export interface Review {
    id: string;
    author: string;
    author_details: {
        name: string;
        username: string;
        avatar_path?: string;
        rating?: number;
    };
    content: string;
    created_at: string;
    updated_at: string;
    url: string;
}

export interface Reviews {
    results: Review[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface MediaCardProps {
    item: {
        id: number;
        title?: string;
        name?: string;
        poster_path?: string;
        vote_average?: number;
        release_date?: string;
        first_air_date?: string;
        media_type?: 'movie' | 'tv';
    };
    type?: 'movie' | 'tv';
}

export interface MediaDetailsProps {
    details: any;
    type: 'movie' | 'tv';
    showId?: number
}

// Movie types
export interface Movie {
    id: number;
    title: string;
    original_title?: string;
    overview: string;
    backdrop_path?: string;
    poster_path?: string;
    release_date?: string;
    vote_average?: number;
    vote_count?: number;
    popularity?: number;
    adult?: boolean;
    video?: boolean;
    genre_ids?: number[];
    original_language?: string;
    media_type?: 'movie';
    [key: string]: any;
}

export interface MoviesGenreClientProps {
    genreId: number;
    genreName: string;
    initialPage: number;
    initialData: any;
}

export interface MovieDetails extends Movie {
    runtime?: number;
    budget?: number;
    revenue?: number;
    status?: string;
    tagline?: string;
    homepage?: string;
    imdb_id?: string;
    genres?: Genre[];
    production_companies?: ProductionCompany[];
    production_countries?: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    spoken_languages?: Array<{
        iso_639_1: string;
        name: string;
        english_name: string;
    }>;
    credits?: Credits;
    reviews?: Reviews;
    belongs_to_collection?: {
        id: number;
        name: string;
        poster_path?: string;
        backdrop_path?: string;
    };
}

// TV Show types
export interface TVShow {
    id: number;
    name: string;
    original_name?: string;
    overview: string;
    backdrop_path?: string;
    poster_path?: string;
    first_air_date?: string;
    vote_average?: number;
    vote_count?: number;
    popularity?: number;
    genre_ids?: number[];
    origin_country?: string[];
    original_language?: string;
    media_type?: 'tv';
    [key: string]: any;
}

export interface ShowsGenreClientProps {
    genreId: number;
    genreName: string;
    initialPage: number;
    initialData: any;
}

export interface Season {
    id: number;
    name: string;
    overview: string;
    season_number: number;
    episode_count: number;
    air_date?: string;
    poster_path?: string;
}

export interface ShowDetails extends TVShow {
    created_by?: Array<{
        id: number;
        name: string;
        profile_path?: string;
    }>;
    episode_run_time?: number[];
    genres?: Genre[];
    homepage?: string;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: {
        id: number;
        name: string;
        overview: string;
        episode_number: number;
        season_number: number;
        air_date: string;
    };
    next_episode_to_air?: {
        id: number;
        name: string;
        overview: string;
        episode_number: number;
        season_number: number;
        air_date: string;
    };
    networks?: Array<{
        id: number;
        name: string;
        logo_path?: string;
        origin_country: string;
    }>;
    number_of_episodes?: number;
    number_of_seasons?: number;
    production_companies?: ProductionCompany[];
    production_countries?: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    seasons?: Season[];
    spoken_languages?: Array<{
        iso_639_1: string;
        name: string;
        english_name: string;
    }>;
    status?: string;
    tagline?: string;
    type?: string;
    credits?: Credits;
    reviews?: Reviews;
}

export interface Episode {
    id: number;
    name: string;
    overview: string;
    episode_number: number;
    season_number: number;
    air_date?: string;
    still_path?: string;
    runtime?: number;
    vote_average?: number;
    vote_count?: number;
    crew?: Array<{
        id: number;
        name: string;
        job: string;
        department: string;
    }>;
    guest_stars?: Array<{
        id: number;
        name: string;
        character: string;
        profile_path?: string;
    }>;
    [key: string]: any;
}

export interface EpisodesProps {
    seasons: any[];
    showId: number;
}

export interface SeasonEpisodes {
    id: number;
    name: string;
    overview: string;
    season_number: number;
    air_date?: string;
    poster_path?: string;
    episodes: Episode[];
    [key: string]: any;
}

// API Response types
export interface PaginatedResponse<T> {
    results: any[];
    page: number;
    total_pages: number;
    total_results: number;
}

export interface GenresResponse {
    genres: Genre[];
}

// Trending can be either Movie or TVShow
export type TrendingItem = (Movie | TVShow) & {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    backdrop_path?: string;
    media_type?: 'movie' | 'tv';
};

export interface TrendingProps {
    trending: TrendingItem[];
}

// Media type union
export type MediaItem = Movie | TVShow;
export type MediaDetails = MovieDetails | ShowDetails;
export type MediaType = 'movie' | 'tv';

export interface VideoPlayerProps extends MediaDetailsProps {
    type: 'movie' | 'tv';
    id?: number;
    onBack: () => void;
}

export interface WatchItem {
    id: number;
    season?: string;
    episode?: string;
    type?: 'movie' | 'tv';
    imgPath?: string;
    name?: string;
    date?: string;
}