"use client"

export default function Hero() {
  return (
    <header className="min-h-screen">
      <div className="container bg-center relative">
        <div className="h-screen bg-[url('/Hero/Image.png')] bg-no-repeat bg-cover bg-center"></div>
        <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="logo-overlay bg-[url('/Hero/Logo.png')] bg-no-repeat inset-0 absolute bg-center bg-size-[90%] lg:bg-size-[25%]"></div>
      </div>
    </header>
  )
}
