import Link from "next/link";
import TvShowCard from "./TvShowCard";
import { GenericActionsProps } from "@/types/actions/types";
import { Tv } from "lucide-react";

export default function TvShows(props: GenericActionsProps) {
  const filteredMovies = (props.tvShows ?? [])
    .filter(tvShow => {
      if (props.selectedGenre !== "1" && props.selectedGenre !== "") {
        const genreId = parseInt(props.selectedGenre || "", 10);
        if (!tvShow.genre_ids?.includes(genreId)) {
          return false;
        }
      }

      const searchTerm = props.searchTerm ?? "";
      if (searchTerm.trim() !== "" && !tvShow.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });  

  if (filteredMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="p-6 bg-white/5 rounded-full">
          <Tv size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">No TV shows found</h3>
        <p className="text-gray-400 text-center max-w-md">
          Try adjusting your search criteria or browse our popular shows instead.
        </p>
      </div>
    );
  }

  return (
    <div className="content-grid">
      {filteredMovies.map((tvShow) => (
        <Link
          href={`/tvShows/${tvShow.id}`}
          className="block transform transition-all duration-300 hover:scale-105"
          key={tvShow.id}
        >
          <TvShowCard
            name={tvShow.name || ""}
            posterImage={tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : ""}
            genre_ids={[]}
            overview={tvShow.overview || ""}
            first_air_date={tvShow.first_air_date ? new Date(tvShow.first_air_date) : new Date()}
            vote_average={tvShow.vote_average || 0}
          />
        </Link>
      ))}
    </div>
  );
}