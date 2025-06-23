"use client";

import { ShowResponse } from "moviedb-promise";
import React, { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import TvShowResult from "@/app/components/ui/Actions/TvShows/TvShowResult";
import IAction from "@/actions/IAction";
import SingleTvShowAction from "@/actions/tvShows/SingleTvShowAction";
import ActionsManager from "@/actions/ActionsManager";

const actions: IAction<ShowResponse>[] = [
  new SingleTvShowAction(TvShowResult)
]

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params);
  const [action, setActions] = useState<ActionsManager>(new ActionsManager());
  const [actualMovie, setActualMovie] = useState<ShowResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);

    const initializeActions = async () => {
      setLoading(true);
      const newActions = new ActionsManager();

      await Promise.all(actions.map(actionObject => newActions.addAction(actionObject,{ id: Number(id) || 0 })));
      setActions(newActions);
      setActualMovie(newActions.getAction(0)?.getResults?.() ?? null);
      setLoading(false);
    };
    initializeActions();
  }, [id]); 

  const filteredContent = () => {
    if (loading) {
      return <OrbitProgress color="blue" size="large" easing="ease-in-out" />
    }

    return action.getActionElement(
      0,{}
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
      className="min-h-screen w-full relative z-9"
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

      <div className="absolute inset-0 bg-black/60" />
      
      {filteredContent()}
    </div>
    
  );
}