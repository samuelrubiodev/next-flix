import Image from "next/image";
import { Star, Calendar } from "lucide-react";

export type MovieCardProps = {
  title: string;
  posterImage: string;
  overiew: string;
  releaseDate: Date;
  genres: string[];
  voteAverage: number;
};

export default function MovieCard(props: MovieCardProps) {
  return (
    <div className="movie-card glass-card group cursor-pointer overflow-hidden">
      {/* Poster Image */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <Image
          src={props.posterImage}
          alt={`Poster of ${props.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
        
        {/* Overlay with rating */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="rating-badge flex items-center space-x-1">
                <Star size={14} fill="currentColor" />
                <span>{Math.round(props.voteAverage * 10)}%</span>
              </div>
              <div className="flex items-center space-x-1 text-white/80 text-sm">
                <Calendar size={14} />
                <span>{props.releaseDate.getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 group-hover:text-red-400 transition-colors duration-300" 
            title={props.title}>
          {props.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            {props.releaseDate.getFullYear()}
          </span>
          <div className="rating-badge">
            {Math.round(props.voteAverage * 10)}%
          </div>
        </div>

        {/* Overview - shown on hover */}
        <p className="text-gray-300 text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {props.overiew}
        </p>
      </div>
    </div>
  );
}