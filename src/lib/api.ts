// Helper to get correct env vars based on environment
const getApiConfig = () => {
    const isServer = typeof window === 'undefined';
    return {
        baseUrl: isServer 
            ? process.env.API_BASE_URL 
            : process.env.NEXT_PUBLIC_API_BASE_URL,
        token: isServer 
            ? process.env.ACCESS_TOKEN 
            : process.env.NEXT_PUBLIC_ACCESS_TOKEN
    };
};

export async function getTrending() {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/trending/all/week?language=en-US`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    const data = await res.json()
    return data.results || []
}

export async function getMovieGenres() {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/genre/movie/list?language=en`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    const data = await res.json()
    return data.genres || []
}

export async function getShowsGenres() {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/genre/tv/list?language=en`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    const data = await res.json()
    return data.genres || []
}

export async function getMoviesByGenre(genreId: number, page: number = 1) {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    const data = await res.json()
    
    return {
        results: data.results || [],
        page: data.page || 1,
        totalPages: data.total_pages || 1,
        totalResults: data.total_results || 0
    }
}

export async function getShowsByGenre(genreId: number, page: number = 1) {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    const data = await res.json()
    
    return {
        results: data.results || [],
        page: data.page || 1,
        totalPages: data.total_pages || 1,
        totalResults: data.total_results || 0
    }
}

export async function getMovieDetails(movieId: number) {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/movie/${movieId}?append_to_response=credits%2Creviews&language=en-US`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    return res.json()
}

export async function getShowDetails(showId: number) {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/tv/${showId}?append_to_response=credits%2Creviews&language=en-US`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    return res.json()
}

export async function searchMulti(query: string, page: number = 1) {
    const { baseUrl, token } = getApiConfig();
    
    const res = await fetch(`${baseUrl}/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=${page}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`)
    }
    
    const data = await res.json()
    
    return {
        results: data.results || [],
        page: data.page || 1,
        totalPages: data.total_pages || 1,
        totalResults: data.total_results || 0
    }
}