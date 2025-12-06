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