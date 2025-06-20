"use client";

import { MovieResponse } from "moviedb-promise";
import React, { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import IActionRequest from "@/actions/requests/IActionRequest";
import { GenericMovieActionRequest } from "@/types/actions/types";
import SingleMovieRequest from "@/actions/requests/Movie/SingleMovieRequest";
import MovieResult from "@/app/components/ui/Actions/Movies/MovieResults";
import ActionsSingleMovies from "@/actions/movies/single/ActionsSingleMovies";

const actions: IActionRequest<MovieResponse,GenericMovieActionRequest>[] = [
  new SingleMovieRequest(1,MovieResult)
];

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params);
  const [action, setActions] = useState<ActionsSingleMovies>(new ActionsSingleMovies());
  const [actualMovie, setActualMovie] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);

    const initializeActions = async () => {
      setLoading(true);
      const newActions = new ActionsSingleMovies();

      await Promise.all(actions.map(actionObject => newActions.addAction(actionObject,{ id: Number(id) || 0 })));
      setActions(newActions);

      setActualMovie(actions[0].Results)
      setLoading(false);
    };
    initializeActions();
  }, [id]); 

  const filteredContent = () => {
    if (loading) {
      return <OrbitProgress color="blue" size="large" easing="ease-in-out" />
    }

    return action.getActionByActionSelected(
      0,{movie: {}, movies: [], searchTerm: "",calification: "",selectedGenre: "", sort: ""}
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <OrbitProgress color="blue" size="large" text="" textColor="" easing="ease-in-out" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        minHeight: 'calc(100vh - 120px)'
      }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg" 
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${actualMovie?.backdrop_path || ""})`,
        }}
      />
      <div className="absolute inset-0 bg-black/60"  />
      {filteredContent()}
    </div>
  );
}