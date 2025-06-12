/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, Suspense } from "react"
import { MovieResult, TvResult } from "moviedb-promise";
import SearchMovie from "../components/ui/SearchMovie";
import Page from "../components/ui/Page";
import { useSearchParams, useRouter } from 'next/navigation'
import Switch from "../components/ui/Switch";
import MovieAction from "@/actions/MovieAction";
import IRequestAction from "@/actions/IRequestAction";
import TvAction from "@/actions/TvAction";
import Actions from "@/actions/Actions";
import { OrbitProgress } from "react-loading-indicators";

const actions: IRequestAction<MovieResult[] | TvResult[]>[] = [
  new MovieAction(1),
  new TvAction(1)
];

function HomeContent() {
  const searchParams = useSearchParams();
  const [allActions, setActions] = useState<Actions>(new Actions());
  const [searchTerm, setSearchTerm] = useState("");
  const [actionSelected, setActionSelected] = useState<number>(MovieAction.NUMBER_OPTION);
  const [isLoading, setIsLoading] = useState(true);

  const entertainmentContent = searchParams.get('entertainmentContent');

  useEffect(() => {
    const initializeActions = async () => {
      setIsLoading(true);
      const newActions = new Actions();

      await Promise.all(actions.map(action => newActions.addAction(action)));

      setActions(newActions);
      setIsLoading(false);
    };
    initializeActions();
  },[entertainmentContent])

  useEffect(() => {
    setActionSelected(Number(entertainmentContent) || MovieAction.NUMBER_OPTION);
  },[entertainmentContent])

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
        onSearchChange={setSearchTerm}
      />
      <div className="flex flex-row items-center h-full w-full">
        <h1 className="text-3xl mt-5 mb-5 ml-2">Popular</h1>
        {!isLoading 
          ? <Switch 
              className="flex justify-center ml-2 w-60 h-10"
              onChange={setActionSelected}
              selectedIndex={actionSelected}
            >
              <p key={"movies"}>Movies</p>
              <p key={"tv_shows"}>TV Shows</p>
            </Switch> 
          : null}
      </div>

      <div className="flex flex-row justify-around overflow-x-scroll overflow-y-hidden h-full 
        bg-white pl-5 pr-5 pb-5 pt-5 rounded-2xl border-2 mr-2 ml-2"
      >
        {filteredContent()}
      </div>
      <Page 
        onChange={() => {console.log("test page")}}
        pages={[1,2,3,4]}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<OrbitProgress color="blue" size="large" easing="ease-in-out" />}>
      <HomeContent />
    </Suspense>
  );
}