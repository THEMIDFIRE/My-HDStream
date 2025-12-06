import MoviesSection from '@/app/_components/Movie&Show/Section'
import Trending from '@/app/_components/Movie&Show/Trending'
import { getTrending } from '@/lib/api'

export default async function page() {
    const data = await getTrending()

  return (
    <>
      <Trending data={data} />
      <MoviesSection />
    </>
  )
}
