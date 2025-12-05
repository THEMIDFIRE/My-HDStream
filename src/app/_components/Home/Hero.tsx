"use client"

import { Button } from "@/components/ui/button"
import { PlayIcon } from "@heroicons/react/24/solid"
import HeroLogo from "../HeroLogo"

export default function Hero() {
  return (
    <header className="min-h-screen mb-96 max-w-full w-full">
      <div className="container relative bg-center h-screen max-w-full w-full">
        <div className="absolute max-w-screen w-full">
          <div className="h-screen bg-[url('/hero-bg-mobile.png')] md:bg-[url('/hero-bg.png')] bg-no-repeat bg-cover md:bg-cover bg-center"></div>
          <div className="overlay absolute top-0 left-0 w-full h-2/3 bg-linear-to-b from-black/90 to-transparent"></div>
          <HeroLogo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] lg:w-[70%]" />
          <div className="overlay absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-black/90 to-transparent"></div>
        </div>
        <div className="text-center w-11/12 2xl:w-[57%] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">The Best Streaming Experience</h1>
          <p className="text-lg text-gray-500 mt-3.5 mb-12 hidden md:block">My HDStream is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With My HDStream, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
          <p className="text-sm text-gray-500 mt-3.5 mb-12 block md:hidden">My HDStream is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere.</p>
          <Button className="text-lg text-white bg-red-500 hover:bg-red-700 transition-all duration-300 ease-in-out has-[>svg]:px-6 py-8"><PlayIcon className="size-6" />Start Watching Now</Button>
        </div>
      </div>
    </header>
  )
}
