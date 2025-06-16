import { GenericMovieActionRequest } from "@/types/actions/types";
import Link from "next/link";

export default function MoviesResult(props: GenericMovieActionRequest) {
  return (
    <div className="flex flex-col relative mr-2 ml-2">
      {props.movies.map((movie,id) => (
        <Link 
          key={id} 
          href={{
            pathname: `/movies/${movie.id}`
          }}>
          <div
            className="mt-5 ml-2 text-zinc-300 flex flex-row items-center 
            border-b-2 w-full border-t-2 justify-between hover:bg-zinc-500 hover:text-white hover:cursor-pointer transition-colors duration-150 ease-in-out"
            >  
            <p>{movie.title}</p>
            <p className="text-2xl">{new Date(movie.release_date || Date.now()).toLocaleDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}