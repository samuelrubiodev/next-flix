"use client";

import { MovieResult } from "moviedb-promise";
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import Movies from "@/app/components/ui/Actions/Movies/Movies";
import { OrbitProgress } from "react-loading-indicators";
import SearchMovie from "@/app/components/ui/SearchMovie";
import { useRouter } from "next/navigation";
import IAction from "@/actions/IAction";
import SearchMovieAction from "@/actions/movies/SearchMovieAction";
import ActionsManager from "@/actions/ActionsManager";

const actions: IAction<MovieResult[]>[] = [
  new SearchMovieAction(Movies)
]

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [action, setActions] = useState<ActionsManager>(new ActionsManager());
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");

  useEffect(() => {
    const initializeActions = async () => {
      setIsLoading(true);
      const newActions = new ActionsManager();

      await Promise.all(actions.map(action => newActions.addAction(action,{ isAdultContent: true, page: 1, query: searchTerm })));

      setActions(newActions);
    };
    initializeActions();
    setIsLoading(false);

  },[searchTerm]);
  
  useEffect(() => {
    const currentSearch = searchParams.get('search');

    setSearchTerm(currentSearch || "");
  }, [searchParams]);

  const filteredContent = () => {
    if (isLoading) {
      return <OrbitProgress color="blue" size="large" easing="ease-in-out" />
    }

    return action.getActionElement(
      0,{ searchTerm, selectedGenre: "", calification: "", sort: "" }
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