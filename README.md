# My HDStream 🎬

A full-featured streaming platform built with Next.js, featuring real movie/TV show data from TMDB API with complete streaming capabilities.

![My HDStream Banner](https://my-hd-stream.vercel.app/opengraph-image.png)

## 🚀 Live Demo
**[https://my-hd-stream.vercel.app](https://my-hd-stream.vercel.app)**

## ✨ Features

### 🎥 Core Streaming
- **Dual Media Players**: Multiple player implementations for optimal compatibility
- **Watch History Tracking**: Automatically saves your progress (season & episode)
- **Continue Watching**: Resume from where you left off
- **Playback Controls**: Full media controls including quality selection

### 🔍 Discovery & Navigation
- **Advanced Search**: Real-time search across TMDB's entire library
- **Smart Categories**: Browse by genre, popularity, rating, and release date
- **Personal Watchlist**: Save movies/shows to watch later
- **Trending Sections**: Always updated with what's popular

### 👤 User Experience
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Dark/Light Mode**: Comfortable viewing in any environment
- **Performance Optimized**: TanStack Query caching for instant navigation
- **Accessible**: Built with Radix UI for full accessibility compliance

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### State Management & Data
- **TanStack Query** - Server state management & caching
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### APIs & Integration
- **TMDB API** - Movie/TV show data and metadata
- **Multiple Streaming Sources** - Integrated video providers

### Development Tools
- **ESLint** - Code quality
- **TypeScript** - Static type checking
- **GitHub Actions** - Automated workflows

## 📁 Project Structure
my-stream/
├── app/                    # Next.js App Router Structure
│   ├── (pages)/           # Main application pages
│   │   ├── Movies&Shows/  # Core content sections
│   │   │   ├── movie/[id] # Dynamic movie details
│   │   │   ├── tv/[id]    # Dynamic TV show details
│   │   │   ├── movies/genre/[id]  # Genre-based filtering
│   │   │   └── shows/genre/[id]   # Show genre filtering
│   │   ├── Search/        # Advanced search functionality
│   │   ├── Support/       # User support pages
│   │   └── Subscription/  # Subscription management
│   ├── components/        # Reusable component library
│   │   ├── ui/           # 20+ Radix-based UI components
│   │   ├── shared/       # Cross-page sections
│   │   ├── Home/         # Homepage specific components
│   │   ├── Search/       # Search functionality
│   │   └── WatchLater/   # User watchlist system
│   └── providers/        # Context and state providers
├── lib/                  # Core utilities
│   ├── api.ts           # TMDB API integration layer
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- TMDB API key

### Installation
```bash
# Clone the repository
git clone https://github.com/THEMIDFIRE/My-HDStream.git

# Navigate to project
cd My-HDStream

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your TMDB API key to .env.local
```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
```bash
# Run development server
npm run dev
```

## 📈 Performance Features
- **Image Optimization:** Next.js automatic image optimization

- **Code Splitting:** Automatic route-based code splitting

- **Static Generation:** Hybrid SSG/ISR for optimal performance

- **Client-side Caching:** TanStack Query for smart data management

- **Bundle Optimization:** Tree-shaking and code minification

## 🎯 Project Goals
This project was built to:

- Demonstrate full-stack capabilities with Next.js

- Showcase real-world API integration at scale

- Implement complex user features like watch history

- Create a production-ready streaming experience

- Serve as a portfolio piece for job opportunities

## 🤝 Contributing
While this is primarily a portfolio project, suggestions and feedback are welcome!

*Fork the repository*

*Create a feature branch*

*Commit your changes*

*Push to the branch*

*Open a Pull Request*

## 📄 License
_This project is for portfolio purposes. Movie/TV show data provided by TMDB._

## 👨‍💻 Author
**Mohamed Magdy**

**Portfolio:** https://themidfire.github.io/My-Portfolio/

**LinkedIn:** https://www.linkedin.com/in/themidfire/

**Email:** chasticoder@gmail.com

**GitHub:** @THEMIDFIRE

## 🙏 Acknowledgments
**TMDB** for the comprehensive movie/TV API

**Next.js** for the amazing framework

**Radix UI** for accessible components

**Vercel** for hosting and deployment