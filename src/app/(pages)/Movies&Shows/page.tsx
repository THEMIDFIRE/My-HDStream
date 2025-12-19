import Movies from '@/app/_components/Movie&Show/Movies/Movies'
import Shows from '@/app/_components/Movie&Show/Shows/Shows'
import Trending from '@/app/_components/Movie&Show/Trending'
import { getMovieGenres, getPopularMovies, getPopularShows, getShowsGenres, getTopRatedMovies, getTopRatedShows, getTrending } from '@/lib/api'

export default async function MoviesShowsPage() {
  const [trending, movieGenres, popularMovies, topRatedMovies, showsGenres, popularShows, topRatedShows] = await Promise.all([
    getTrending(),
    getMovieGenres(),
    getPopularMovies(),
    getTopRatedMovies(),
    getShowsGenres(),
    getPopularShows(),
    getTopRatedShows(),
  ])

  return (
    <>
      <Trending trending={trending} />
      <Movies genres={movieGenres} popular={popularMovies} topRated={topRatedMovies} />
      <Shows genres={showsGenres} popular={popularShows} topRated={topRatedShows} />
    </>
  )
}