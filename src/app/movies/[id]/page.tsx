"use client";
import { MovieResponse } from "moviedb-promise";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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
        setActualMovie(data.movie as MovieResponse);
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
    <div className="flex justify-center mt-5  w-full h-full">
       <Image
        src={`https://image.tmdb.org/t/p/w500${actualMovie.poster_path || ""}`}
        alt="Image"
        width={300}
        height={100}
        priority
      />
      <div className="m-5">
        <h1 className="text-3xl font-bold">
          {actualMovie.title}{" "}
          {actualMovie.release_date
            ? `(${new Date(actualMovie.release_date).getFullYear()})`
            : ""}
        </h1>
        <p>{actualMovie.overview}</p>
      </div>
    </div>
  );
}