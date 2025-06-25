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
import { Sparkles, TrendingUp } from "lucide-react";

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
    const calification = searchParams.get("certification") || "";
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
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <OrbitProgress color="#e50914" size="large" easing="ease-in-out" />
          <p className="text-gray-400">Loading amazing content...</p>
        </div>
      );
    }

    return allActions.getActionElement(
      actionSelected,{ searchTerm, selectedGenre: genre, calification, sort}
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Search Section */}
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
            <div className="flex-1 max-w-2xl">
              <SearchMovie
                text={searchTerm}
                onSearchChange={(term: string) => {
                  router.push(`/home?entertainmentContent=${actionSelected}&search=${term}&page=${page}&genres=${genre}&certification=${calification}&order=${sort}`);
                }}
                label="Discover your next favorite movie or show..."
              />
            </div>
            <Filter onClick={(isActive: boolean) => setFilterActive(isActive)} />
          </div>

          {/* Filter Panel */}
          {isFilterActive && (
            <div className="filter-slide-in glass p-6 rounded-2xl mb-8">
              <FilterGroupElement row>
                <FilterRadioGroupElement>
                  <FilterLabelElement>Adult Content</FilterLabelElement>
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
                  <FilterLabelElement>Certification</FilterLabelElement>
                  <FilterSelectGroupElement name="certification">
                    {CALIFICATION.map((calification,id) => (
                      <FilterSelectElement value={calification} key={id}>{calification}</FilterSelectElement>
                    ))}
                  </FilterSelectGroupElement>
                </FilterGroup>
                <FilterGroup>
                  <FilterLabelElement>Sort By</FilterLabelElement>
                  <FilterSelectGroupElement name="order">
                    <FilterSelectElement value="Select order">Select order</FilterSelectElement>
                    <FilterSelectElement value="Popularity">Popularity</FilterSelectElement>
                  </FilterSelectGroupElement>
                </FilterGroup>
                <FilterButtonElement>Apply Filters</FilterButtonElement>
              </FilterGroupElement>
            </div>
          )}

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-red-600 to-red-800 rounded-xl">
                <TrendingUp size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Popular Content
                </h1>
                <p className="text-gray-400">Discover what's trending now</p>
              </div>
            </div>
            
            {!isLoading && (
              <Switch 
                className="w-80 h-14"
                onChange={(index) => {
                  router.push(`/home?entertainmentContent=${index}&search=${searchTerm}&page=${page}&genres=${genre}&certification=${calification}&order=${sort}`);
                }}
                selectedIndex={actionSelected}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles size={18} />
                  <span>Movies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles size={18} />
                  <span>TV Shows</span>
                </div>
              </Switch>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredContent()}
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <Page 
          onChange={(page) => {
            router.push(`/home?entertainmentContent=${actionSelected}&search=${searchTerm}&page=${page}&genres=${genre}&certification=${calification}&order=${sort}`);
          }}
          defaultPage={page}
          pages={[1,2,3,4]}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <OrbitProgress 
            color="#e50914" 
            size="large" 
            easing="ease-in-out" 
          />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}