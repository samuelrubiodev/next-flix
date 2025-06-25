/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { GenericActionsProps } from "@/types/actions/types";
import { ShowResponse } from "moviedb-promise";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TvShowResult(props: GenericActionsProps) {
  const [actualMovie, setActualMovie] = useState<ShowResponse>(props.tvShow || {});
  const router = useRouter();

  return (
    <div className="relative flex justify-center pt-5 w-full h-full">
      <div className="aspect-[2/3] relative">
        <Image
          src={`https://image.tmdb.org/t/p/w500${actualMovie.poster_path || ""}`}
          alt="Image"
          width={400}
          height={100}
          priority
          className="border-2 border-white/50 rounded-lg shadow-xl hidden md:block h-auto max-w-full"
        />
      </div>
      <div className="ml-0 md:ml-8 text-white flex flex-col gap-4">
        <h1 className="text-3xl font-bold hover:cursor-pointer hover:opacity-80
          2xl:text-3xl
          xl:text-2xl
          lg:text-xl
          md:text-lg
          sm:text-sm
          max-sm:text-sm
        ">
          <Link 
            href={actualMovie.homepage || ""}
            target="_blank"
            >
            {actualMovie.name}{" "}
            {actualMovie.first_air_date
              ? `(${new Date(actualMovie.first_air_date).getFullYear()})`
              : ""}
          </Link>
        </h1>
        <div className="flex flex-row mb-2 mt-2 items-center">
          {actualMovie.genres?.map((genre) => (
            <span
              key={genre.id}
                className="px-3 py-1 mr-2 bg-white/20 rounded-full text-sm text-white font-medium hover:bg-white/30 cursor-pointer transition-colors max-2xl:text-sm"
              onClick={() => router.push(`/home/?entertainmentContent=1&genres=${genre.id}&califications=Select+calification&order=Select+order&adult=No`)}
            >
              {genre.name}
            </span>
          ))}
          <p className="opacity-80">{actualMovie.number_of_episodes} episodes</p>
        </div>
        <p className="leading-relaxed opacity-90 w-150
          2xl:text-xl
          lg:text-lg
          md:text-base
          sm:text-sm
          max-sm:text-sm
        ">{actualMovie.overview}</p>
        <div className="flex flex-row">
          <p className="mt-5 text-zinc-300 font-bold text-2xl rounded-full border-2 border-green-700 flex justify-center items-center bg-zinc-600 hover:bg-zinc-700
            2xl:text-2xl 2xl:w-15 2xl:h-15
            xl:text-xl xl:w-12 xl:h-12
            lg:text-lg lg:w-10 lg:h-10
            md:text-base md:w-10 md:h-10
            sm:text-sm sm:w-7 sm:h-7
            max-sm:text-sm max-sm:w-5 max-sm:h-5
          ">
            {`${Math.round(Number(actualMovie.vote_average) * 10)}%`}
          </p>
          <p className="flex self-center mt-4 ml-2">User Ratings</p>
        </div>
      </div>
    </div>
  )
};