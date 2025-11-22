"use client"

import { Button } from "@/components/ui/button"
import { PlayIcon } from "@heroicons/react/24/solid"

export default function Hero() {
  return (
    <header className="min-h-screen mb-96">
      <div className="container relative bg-center h-screen max-w-screen">
        <div className="absolute w-full">
          <div className="h-screen bg-[url('/hero-bg.png')] bg-no-repeat bg-cover bg-center"></div>
          <div className="overlay absolute top-0 left-0 w-full h-2/3 bg-linear-to-b from-black/90 to-transparent"></div>
          <img src="/hero-logo.png" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%]" />
          <div className="overlay absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-black/90 to-transparent"></div>
        </div>
        <div className="text-center w-[56%] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3">
          <h2 className="text-6xl font-bold">The Best Streaming Experience</h2>
          <p className="text-lg text-gray-500 mt-3.5 mb-12">My HDStream is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With My HDStream, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
          <Button className="text-lg text-white bg-red-500 hover:bg-red-700 transition-all duration-300 ease-in-out has-[>svg]:px-6 py-8"><PlayIcon className="size-6"/>Start Watching Now</Button>
        </div>
      </div>
    </header>
  )
}
