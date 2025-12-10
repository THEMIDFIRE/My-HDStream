import Movies from '@/app/_components/Movie&Show/Movies/Movies'
import Shows from '@/app/_components/Movie&Show/Shows/Shows'
import Trending from '@/app/_components/Movie&Show/Trending'
import { getMovieGenres, getShowsGenres, getTrending } from '@/lib/api'

export default async function MoviesShowsPage() {
  // Fetch initial data server-side for SEO
  const [trending, movieGenres, showsGenres] = await Promise.all([
    getTrending(),
    getMovieGenres(),
    getShowsGenres()
  ])

  return (
    <>
      <Trending trending={trending} />
      <Movies genres={movieGenres} />
      <Shows genres={showsGenres} />
    </>
  )
}