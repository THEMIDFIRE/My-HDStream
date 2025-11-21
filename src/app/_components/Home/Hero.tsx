"use client"

export default function Hero() {
  return (
    <header className="min-h-screen">
      <div className="container bg-center relative">
        <div className="h-screen bg-[url('/hero-bg.png')] bg-no-repeat bg-cover bg-center"></div>
        <div className="overlay absolute top-0 left-0 w-full h-2/3 bg-linear-to-b from-black/90 to-transparent"></div>
        <div className="overlay absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-black/90 to-transparent"></div>
        <div className="logo-overlay bg-[url('/hero-logo.png')] bg-no-repeat inset-0 absolute bg-center bg-size-[90%] lg:bg-size-[25%]"></div>
      </div>
    </header>
  )
}
