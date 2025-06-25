import MovieCard from "./MovieCard";
import Link from "next/link";
import { GenericActionsProps } from "@/types/actions/types";
import { Film } from "lucide-react";

export default function Movies(props: GenericActionsProps) {
  const filteredMovies = (props.movies ?? [])
    .filter(movie => {
      if (props.selectedGenre != "1" && props.selectedGenre !== "") {
        const genreId = parseInt(props.selectedGenre || "", 10);
        if (!movie.genre_ids?.includes(genreId)) {
          return false;
        }
      }

      const searchTerm = props.searchTerm ?? "";
      if (searchTerm.trim() !== "" && !movie.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });  

  if (filteredMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="p-6 bg-white/5 rounded-full">
          <Film size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">No movies found</h3>
        <p className="text-gray-400 text-center max-w-md">
          Try adjusting your search criteria or browse our popular movies instead.
        </p>
      </div>
    );
  }

  return (
    <div className="content-grid">
      {filteredMovies.map(movie => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
          className="block transform transition-all duration-300 hover:scale-105"
        >
          <MovieCard
            title={movie.title || ""}
            posterImage={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://placehold.co/600x900/1a1a1a/666666/png?text=No+Image"}
            genres={[]}
            overiew={movie.overview || ""} 
            releaseDate={movie.release_date ? new Date(movie.release_date) : new Date()}
            voteAverage={movie.vote_average || 0}
          />
        </Link>
      ))}
    </div>
  );
}