"use client";

import { MovieResult } from "moviedb-promise";
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import Movies from "@/app/components/ui/Actions/Movies/Movies";
import { OrbitProgress } from "react-loading-indicators";
import SearchMovie from "@/app/components/ui/SearchMovie";
import IActionRequest from "@/actions/requests/IActionRequest";
import { GenericMovieActionRequest } from "@/types/actions/types";
import SearchMovieRequest from "@/actions/requests/Movie/SearchMovieRequest";
import ActionsSomeMovies from "@/actions/movies/some/ActionsSomeMovies";
import { useRouter } from "next/navigation";

const actions: IActionRequest<MovieResult[],GenericMovieActionRequest>[] = [
  new SearchMovieRequest(1,Movies)
];

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [action, setActions] = useState<ActionsSomeMovies>(new ActionsSomeMovies());
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");

  useEffect(() => {
    const initializeActions = async () => {
      setIsLoading(true);
      const newActions = new ActionsSomeMovies();

      await Promise.all(actions.map(actionObject => newActions.addAction(actionObject,{ page: 1, query: searchTerm || ""})));

      setActions(newActions);
      setIsLoading(false);
    };
    initializeActions();

  },[searchTerm]);
  
  useEffect(() => {
    const currentSearch = searchParams.get('search');

    setSearchTerm(currentSearch || "");
    }, [searchParams]);

  const filteredContent = () => {
    if (isLoading) {
      return <OrbitProgress color="blue" size="large" easing="ease-in-out" />
    }

    return action.getActionByActionSelected(
      0,{searchTerm: searchTerm || "", movies: []}
    );
  };

  return (
    <div>
      <SearchMovie 
        onSearchChange={(searchTerm: string) => {
          router.push(`/home/results?search=${searchTerm}`);
        }}
      />
      <h1 className="text-3xl mt-5 mb-5 ml-2">Search results for movies</h1>
      <div className="flex flex-row justify-around overflow-x-scroll overflow-y-hidden h-full 
        pl-5 pr-5 pb-5 pt-5 rounded-2xl border-0 mr-2 ml-2 bg-transparent"
      >
        {!isLoading
          ? filteredContent()
          : null}
      </div>
    </div>
  )
};

export default function ResultsPage() {
  return (
    <Suspense fallback={<OrbitProgress color="blue" size="large" easing="ease-in-out" />}>
      <ResultsContent />
    </Suspense>
  )
}