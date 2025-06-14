"use client";

import SearchMovie from "./SearchMovie"
import { useEffect, useState } from "react"
import { X } from 'lucide-react';
import ActionsSomeMovies from "@/actions/movies/some/ActionsSomeMovies";
import ITestRequest from "@/actions/requests/ITestRequest";
import { MovieResult } from "moviedb-promise";
import { GenericMovieActionRequest } from "@/types/actions/types";
import SearchMovieRequest from "@/actions/requests/Movie/SearchMovieRequest";
import MoviesResult from "./Actions/Movies/MoviesResult";
import { OrbitProgress } from "react-loading-indicators";

type PopupResults = {
  exit: () => void;
}

const actions: ITestRequest<MovieResult[],GenericMovieActionRequest>[] = [
  new SearchMovieRequest(1,MoviesResult)
];

export default function PopupResults(props: PopupResults) {
  const [search, setSearch] = useState("");
  const [action, setActions] = useState<ActionsSomeMovies>(new ActionsSomeMovies());
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const initializeActions = async () => {
      setIsLoading(true);
      const newActions = new ActionsSomeMovies();

      await Promise.all(actions.map(actionObject => newActions.addAction(actionObject,{ page: 1, query: search})));

      setActions(newActions);
      setIsLoading(false);
    };
    initializeActions();
  },[search])

  const filteredContent = () => {
    if (isLoading) {
      return <OrbitProgress color="blue" size="large" easing="ease-in-out" />
    }

    return action.getActionByActionSelected(
      0,{searchTerm: search, movies: []}
    );
  };

  return (
    <div className="bg-white absolute h-full w-full overflow-y-scroll overflow-x-hidden pb-10">
      <div className="relative mt-5 flex flex-row items-center">
        <SearchMovie 
          onSearchChange={setSearch}
          text={search}
        />
        <X 
          size={30} 
          color="black" 
          className="mr-2 hover:cursor-pointer" 
          onClick={() => props.exit()}
        />
      </div>
      {filteredContent()}
    </div>
  )
}