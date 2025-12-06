import Movies from '@/app/_components/Movie&Show/Movies/Movies'
import Shows from '@/app/_components/Movie&Show/Shows/Shows'
import Trending from '@/app/_components/Movie&Show/Trending'
import { getMovieGenres, getShowsGenres, getTrending } from '@/lib/api'

export default async function page() {
  const trending = await getTrending()
  const MovieGenres = await getMovieGenres()
  const ShowsGenres = await getShowsGenres()


  return (
    <>
      <Trending trending={trending} />
      <Movies genres={MovieGenres} />
      <Shows genres={ShowsGenres} />
    </>
  )
}
