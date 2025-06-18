"use client";

import { useEffect, useState, Suspense } from "react"
import { MovieResult, TvResult } from "moviedb-promise";
import SearchMovie from "../components/ui/SearchMovie";
import Page from "../components/ui/Page";
import { useSearchParams, useRouter } from 'next/navigation';
import Switch from "../components/ui/Switch";
import MovieAction from "@/actions/MovieAction";
import IRequestAction from "@/actions/IRequestAction";
import TvAction from "@/actions/TvAction";
import Actions from "@/actions/Actions";
import { OrbitProgress } from "react-loading-indicators";
import TvShowsRequest from "@/actions/requests/Tv/TvShowsRequest";
import MoviesRequest from "@/actions/requests/Movie/MoviesRequest";
import Movies from "../components/ui/Actions/Movies/Movies";

const actions: IRequestAction<MovieResult[] | TvResult[]>[] = [
  new MovieAction(1,new MoviesRequest(),Movies),
  new TvAction(1,new TvShowsRequest())
];

function HomeContent() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [allActions, setActions] = useState<Actions>(new Actions());
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || "");
  const [actionSelected, setActionSelected] = useState<number>(() => {
    const initialEntertainmentContent = searchParams.get('entertainmentContent');
    const numericContent = Number(initialEntertainmentContent);
    if (initialEntertainmentContent !== null && !isNaN(numericContent)) {
      return numericContent;
    }
    return typeof MovieAction.NUMBER_OPTION === 'number' ? MovieAction.NUMBER_OPTION : 0;
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const currentEntertainmentContent = searchParams.get('entertainmentContent');
    const currentSearch = searchParams.get('search');

    const numericEntertainmentContent = Number(currentEntertainmentContent);
    if (currentEntertainmentContent !== null && !isNaN(numericEntertainmentContent)) {
      setActionSelected(numericEntertainmentContent);
    } else {
      setActionSelected(typeof MovieAction.NUMBER_OPTION === 'number' ? MovieAction.NUMBER_OPTION : 0);
    }

    setSearchTerm(currentSearch || "");
  }, [searchParams]);

  useEffect(() => {
    const initializeActions = async () => {
      setIsLoading(true);
      const newActions = new Actions();

      await Promise.all(actions.map(action => newActions.addAction(action,page)));

      setActions(newActions);
      setIsLoading(false);
    };
    initializeActions();
  },[page])

  const filteredContent = () => {
    if (isLoading) {
      return <OrbitProgress color="blue" size="large" easing="ease-in-out" />
    }

    return allActions.getActionByActionSelected(
      actionSelected,searchTerm
    );
  };

  return (
    <div>
      <SearchMovie
        text={searchTerm}
        onSearchChange={(term: string) => {
          router.push(`/home?entertainmentContent=${actionSelected}&search=${term}`);
        }}
      />
      <div className="flex flex-row items-center h-full w-full">
        <h1 className="text-3xl mt-5 mb-5 ml-2 2xl:text-3xl lg:text-2xl md:text-xl sm:text-sm max-sm:text-xs">Popular</h1>
        {!isLoading 
          ? <Switch 
              className="flex justify-center ml-2 w-60 h-10
              2xl:w-60 2xl:h-10 
              lg:w-40 lg:h-12
              md:w-35 md:h-9
              sm:w-30 sm:h-7
              "
              onChange={(index) => {
                router.push(`/home?entertainmentContent=${index}&search=${searchTerm}`);
              }}
              selectedIndex={actionSelected}
            >
              <p className="2xl:text-2xl lg:text-lg md:text-xl sm:text-xs max-sm:text-xs">Movies</p>
              <p className="2xl:text-2xl lg:text-lg md:text-xl sm:text-xs max-sm:text-xs">TV Shows</p>
            </Switch> 
          : null}
      </div>

      <div className="flex flex-row justify-around overflow-x-scroll overflow-y-hidden h-full 
        pl-5 pr-5 pb-5 pt-5 rounded-2xl border-0 mr-2 ml-2 bg-transparent"
      >
        {filteredContent()}
      </div>
      <Page 
        onChange={setPage}
        defaultPage={1}
        pages={[1,2,3,4]}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense 
      fallback={
        <OrbitProgress 
          color="blue" 
          size="large" 
          easing="ease-in-out" 
        />
      }
    >
      <HomeContent />
    </Suspense>
  );
}