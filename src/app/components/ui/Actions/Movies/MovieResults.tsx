/* eslint-disable @typescript-eslint/no-unused-vars */
import { GenericActionsProps } from "@/types/actions/types";
import { MovieResponse } from "moviedb-promise";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MovieResult(props: GenericActionsProps) {
  const [actualMovie, setActualMovie] = useState<MovieResponse>(props.movie || {});
  
  return (
    <div className="relative flex justify-center pt-5 w-full h-full">
      <Image
        src={`https://image.tmdb.org/t/p/w500${actualMovie.poster_path || ""}`}
        alt="Image"
        width={400}
        height={100}
        priority
        className="border-2 border-white/50 rounded-lg shadow-xl hidden md:block"
      />
      <div className="ml-0 md:ml-8 text-white flex flex-col gap-4">
        <h1 className="text-3xl font-bold hover:cursor-pointer hover:opacity-80">
          <Link 
            href={actualMovie.homepage || ""}
            target="_blank"
            >
            {actualMovie.title}{" "}
            {actualMovie.release_date
              ? `(${new Date(actualMovie.release_date).getFullYear()})`
              : ""}
          </Link>
        </h1>
        <div className="flex flex-row mb-2 mt-2 items-center">
          {actualMovie.genres?.map((genre) => (
            <span
              key={genre.id}
                className="px-3 py-1 mr-2 bg-white/20 rounded-full text-sm text-white font-medium hover:bg-white/30 cursor-pointer transition-colors"
            >
              {genre.name}
            </span>
          ))}
          <p className="opacity-80">{`
            ${Math.floor(Number(actualMovie.runtime) / 60)} hours 
            ${Number(actualMovie.runtime) % 60} minutes`}</p>
        </div>
        <p className="text-base leading-relaxed opacity-90 w-150">{actualMovie.overview}</p>
        <div className="flex flex-row">
          <p className="mt-5 text-zinc-300 font-bold text-2xl p-8 rounded-full border-2 border-green-700 flex justify-center items-center w-15 h-15 bg-zinc-600 hover:bg-zinc-700">
            {`${Math.round(Number(actualMovie.vote_average) * 10)}%`}
          </p>
          <p className="flex self-center mt-4 ml-2">User Ratings</p>
        </div>
      </div>
    </div>
  )
}