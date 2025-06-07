import Link from "next/link"
import MovieCard from "../components/ui/MovieCard"

export default function Home() {
  return (
    <div className="flex flex-row m-5">
      <Link
        href={"/home"}
        className="mr-5 hover:blur-xs hover:opacity-70"
      >
        <MovieCard 
          title="Oppenheimer"
          posterImage="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
          genres={["Drama", "Historia"]}
          overiew="Test overiew"
          relaseDate={new Date()}
          voteAverage={8.057}
        />
      </Link>
    </div>
  )
}