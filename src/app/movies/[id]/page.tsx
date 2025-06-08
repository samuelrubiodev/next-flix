"use client";
import { MovieResponse } from "moviedb-promise";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/*
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const id = params.id;
  const response = await fetch("/api/movie?" + new URLSearchParams({ id }).toString());
  const data = await response.json();
  return {
    title: data.movieData.title,
  };
*/

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params);
  const [actualMovie, setActualMovie] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);
    setError(null);

    const fetchMovieData = async () => {
      try {
        const response = await fetch("/api/movie?" + new URLSearchParams({ id }).toString());
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", response.status, errorText);
          setError(`Error ${response.status}: No se pudo cargar la película.`);
          setActualMovie(null);
          return;
        }
        const data = await response.json();
        setActualMovie(data.movieData as MovieResponse);
      } catch (e) {
        console.error("Error en fetch:", e);
        setError("Ocurrió un error al obtener los detalles de la película.");
        setActualMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando detalles de la película...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!actualMovie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No se encontró la película o los datos no están disponibles.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-5 w-5xl h-auto justify-self-center bg-gray-300">
      <Image
        src={`https://image.tmdb.org/t/p/w500${actualMovie.poster_path || ""}`}
        alt="Image"
        width={350}
        height={100}
        priority
        className="border-10 border-white"
      />
      <div className="m-5 text-black">
        <h1 className="text-3xl font-bold hover:cursor-pointer hover:opacity-60">
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
              className="mr-2 px-2 py-1 bg-green-200 rounded text-sm hover:bg-green-400 hover:cursor-pointer"
            >
              {genre.name}
            </span>
          ))}
          <p className="mr-2">{`
            ${Math.floor(Number(actualMovie.runtime) / 60)} hours 
            ${Number(actualMovie.runtime) % 60} minutes`}</p>
        </div>
        <p>{actualMovie.overview}</p>
        <div className="flex flex-row">
          <p className="mt-5 text-2xl rounded-full border-3 border-green-700 flex justify-center items-center w-15 h-15 font-bold bg-white">
            {`${Math.round(Number(actualMovie.vote_average) * 10)}%`}
          </p>
          <p className="flex justify-center items-center">User Ratings</p>
        </div>
      </div>
    </div>
  );
}