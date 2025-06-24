"use client";

import { useEffect, useState, Suspense } from "react"
import { MovieResult, TvResult } from "moviedb-promise";
import SearchMovie from "../components/ui/SearchMovie";
import Page from "../components/ui/Page";
import { useSearchParams, useRouter } from 'next/navigation';
import Switch from "../components/ui/Switch";
import { OrbitProgress } from "react-loading-indicators";
import Movies from "../components/ui/Actions/Movies/Movies";
import Filter from "../components/ui/Filter/Filter";
import FilterLabelElement from "../components/ui/Filter/FilterLabelElement";
import FilterGroupElement from "../components/ui/Filter/GroupElement/FilterGroupElement";
import FilterSelectGroupElement from "../components/ui/Filter/SelectElement/FilterSelectGroupElement";
import FilterSelectElement from "../components/ui/Filter/SelectElement/FilterSelectElement";
import { CALIFICATION, GENRES } from "../env/env";
import FilterGroup from "../components/ui/Filter/GroupElement/FilterGroup";
import FilterButtonElement from "../components/ui/Filter/GroupElement/FilterButtonElement";
import IAction from "@/actions/IAction";
import MoviesAction from "@/actions/movies/MoviesAction";
import TvShowsAction from "@/actions/tvShows/TvShowsAction";
import TvShows from "../components/ui/Actions/TvShows/TvShows";
import ActionsManager from "@/actions/ActionsManager";
import FilterRadioGroupElement from "../components/ui/Filter/RadioElement/FilterRadioGroupElement";
import FilterRadioElement from "../components/ui/Filter/RadioElement/FilterRadioElement";

const actions: IAction<MovieResult[] | TvResult[]>[] = [
  new MoviesAction(Movies),
  new TvShowsAction(TvShows)
]

function HomeContent() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [allActions, setActions] = useState<ActionsManager>(new ActionsManager());
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || "");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterActive, setFilterActive] = useState<boolean>(false);
  const [isAdultContent, setIsAdultContent] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("");
  const [calification, setCalification] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get("page");
    return Number(pageParam) || 1;
  });
  
  const [actionSelected, setActionSelected] = useState<number>(() => {
    const initialEntertainmentContent = searchParams.get('entertainmentContent');
    const numericContent = Number(initialEntertainmentContent);
    if (initialEntertainmentContent !== null && !isNaN(numericContent)) {
      return numericContent;
    }
    return typeof 0 === 'number' ? 0 : 0;
  });

  useEffect(() => {
    const currentEntertainmentContent = searchParams.get('entertainmentContent');
    const currentSearch = searchParams.get('search');
    const page = Number(searchParams.get('page')) || 1;
    const adult: boolean = searchParams.get('adult') === "true";
    const genres: string = searchParams.get("genres") || "";
    const calification = searchParams.get("calification") || "";
    const order = searchParams.get("order") || "";

    const numericEntertainmentContent = Number(currentEntertainmentContent);
    if (currentEntertainmentContent !== null && !isNaN(numericEntertainmentContent)) {
      setActionSelected(numericEntertainmentContent);
    } else {
      setActionSelected(typeof 0 === 'number' ? 0 : 0);
    }

    setSearchTerm(currentSearch || "");
    setIsAdultContent(adult);
    setGenre(genres);
    setCalification(calification);
    setSort(order);
    setPage(page);
  }, [searchParams]);

  useEffect(() => {
    const initializeActions = async () => {
      setIsLoading(true);
      const newActions = new ActionsManager();

      await Promise.all(actions.map(action => newActions.addAction(action,{ isAdultContent: isAdultContent, page, query: searchTerm })));

      setActions(newActions);
      setIsLoading(false);
    };
    initializeActions();
  },[page,isAdultContent, searchTerm])

  const filteredContent = () => {
    if (isLoading) {
      return <OrbitProgress color="blue" size="large" easing="ease-in-out" />
    }

    return allActions.getActionElement(
      actionSelected,{ searchTerm, selectedGenre: genre, calification, sort}
    );
  };

  return (
    <div>
      <div className="flex">
        <SearchMovie
          text={searchTerm}
          onSearchChange={(term: string) => {
            router.push(`/home?entertainmentContent=${actionSelected}&search=${term}&page=${page}&genres=${genre}&califications=${calification}&order=${sort}`);
          }}
        />
        <div className="flex flex-col items-center self-center">
          <Filter onClick={(isActive: boolean) => setFilterActive(isActive)} />
        </div>
      </div>
      <div className='relative flex flex-row items-center self-center'>
        {isFilterActive 
          ? <div className="bg-zinc-400/30 w-full ml-3 mt-2 pb-2 pt-2 border-0 rounded-sm flex items-center justify-around
            2xl:mr-24
            xl:mr-24
            lg:mr-20
            md:mr-15
            sm:mr-10
          ">
              <FilterGroupElement row>
                <FilterRadioGroupElement>
                  <FilterLabelElement>Adult</FilterLabelElement>
                  <FilterRadioElement name="adult">Yes</FilterRadioElement>
                  <FilterRadioElement name="adult">No</FilterRadioElement>
                </FilterRadioGroupElement>
                <FilterGroup>
                  <FilterLabelElement>Genre</FilterLabelElement>
                  <FilterSelectGroupElement name="genres">
                    {GENRES.map((genre,id) => (
                      <FilterSelectElement value={genre.id?.toString() || ""} key={id}>{genre.name}</FilterSelectElement>
                    ))}
                  </FilterSelectGroupElement>
                </FilterGroup>
                <FilterGroup>
                  <FilterLabelElement>Calification</FilterLabelElement>
                  <FilterSelectGroupElement name="califications">
                    {CALIFICATION.map((calification,id) => (
                      <FilterSelectElement value={calification} key={id}>{calification}</FilterSelectElement>
                    ))}
                  </FilterSelectGroupElement>
                </FilterGroup>
                <FilterGroup>
                  <FilterLabelElement>Sort</FilterLabelElement>
                  <FilterSelectGroupElement name="order">
                    <FilterSelectElement value="Select order">Select order</FilterSelectElement>
                    <FilterSelectElement value="Popularity">Popularity</FilterSelectElement>
                  </FilterSelectGroupElement>
                </FilterGroup>
                <FilterButtonElement>Submit</FilterButtonElement>
              </FilterGroupElement>
            </div>
          : null
        }
      </div>
      <div className="flex flex-row items-center h-full w-full">
        <h1 className="text-3xl mt-5 mb-5 ml-2 2xl:text-3xl lg:text-2xl md:text-xl sm:text-sm max-sm:text-xs">Popular</h1>
        {!isLoading 
          ? <Switch 
              className="flex justify-center ml-2 w-60 h-10
                2xl:w-60 2xl:h-10 
                lg:w-40 lg:h-12
                md:w-35 md:h-9
                sm:w-30 sm:h-7"
              onChange={(index) => {
                router.push(`/home?entertainmentContent=${index}&search=${searchTerm}&page=${page}&genres=${genre}&califications=${calification}&order=${sort}`);
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
        onChange={(page) => {
          router.push(`/home?entertainmentContent=${actionSelected}&search=${searchTerm}&page=${page}&genres=${genre}&califications=${calification}&order=${sort}`);
        }}
        defaultPage={page}
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