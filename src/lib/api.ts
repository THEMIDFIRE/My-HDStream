export async function getTrending() {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/trending/all/week?language=en-US`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`)
        }
        
        const data = await res.json()
        
        return data.results || []
        
    } catch (error) {
        console.error('Error fetching trending data:', error)
        return []
    }
}

export async function getMovieGenres() {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/genre/movie/list?language=en`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`)
        }
        
        const data = await res.json()
        
        return data.genres || []
        
    } catch (error) {
        console.error('Error fetching trending data:', error)
        return []
    }
}

export async function getMoviesByGenre(genreId: number, page: number = 1) {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`)
        }
        
        const data = await res.json()
        
        // Return both results and pagination info
        return {
            results: data.results || [],
            page: data.page || 1,
            totalPages: data.total_pages || 1,
            totalResults: data.total_results || 0
        }
        
    } catch (error) {
        console.error('Error fetching movies by genre:', error)
        return {
            results: [],
            page: 1,
            totalPages: 1,
            totalResults: 0
        }
    }
}

export async function getShowsGenres() {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/genre/tv/list?language=en`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`)
        }
        
        const data = await res.json()
        
        return data.genres || []
        
    } catch (error) {
        console.error('Error fetching trending data:', error)
        return []
    }
}

export async function getShowsByGenre(genreId: number, page: number = 1) {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/discover/tv?language=en-US&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
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
        
    } catch (error) {
        console.error('Error fetching shows by genre:', error)
        return {
            results: [],
            page: 1,
            totalPages: 1,
            totalResults: 0
        }
    }
}