/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link"
import { CircleUserRound, HomeIcon } from 'lucide-react';
import { useState } from "react";
import PopupResults from "./PopupResults";
import Image from "next/image";
import SearchMovie from "./SearchMovie";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isPopupResultsActive, setPopupResultsActive] = useState(false);
  const [search, setSearch] = useState("");
  const [isHover, setHover] = useState(false);

  return (
    <div>
      {isPopupResultsActive 
          ? <PopupResults exit={() => setPopupResultsActive(false)} />
          : null}
      <header className="flex items-center justify-around bg-black w-full h-17">
        <div className="flex flex-row">
          <Image src="/film.svg" height={40} width={40} alt="Icon app"/>
          <h1 className="m-5
            2xl:text-3xl xl:text-2xl md:text-xl sm:text-sm max-sm:text-xs
            text-white">Next Flix</h1>
        </div>
        
        <Link className="
          p-1 isolate rounded-sm text-zinc-300 transition-colors hover:text-white hover:bg-zinc-600 flex flex-row items-center
          2xl:text-2xl xl:text-xl sm:text-sm" href={"/home"}>
          <HomeIcon size={20} className="mr-2"/>
          <p>Home</p>
        </Link>
        <div className="w-100 flex justify-around">
          <Link 
            className="p-1 isolate rounded-sm text-zinc-300 transition-colors hover:text-white hover:bg-zinc-600
            2xl:text-2xl xl:text-xl sm:text-sm" 
            href={"/home?entertainmentContent=0"}
            >
              <p>Movies</p>
          </Link>
          <Link 
            className="p-1 isolate rounded-sm text-zinc-300 transition-colors hover:text-white hover:bg-zinc-600
            2xl:text-2xl xl:text-xl sm:text-sm"  
            href={"/home?entertainmentContent=1"}
          >
            <p>TV Shows</p>
          </Link>
        </div>

        <div className="flex flex-row items-center 2xl:w-80 lg:w-60 sm:w-30 max-sm:w-20">
          <SearchMovie 
            onSearchChange={setSearch}
            label="Enter movie for search"
            onKeyPressEnter={(term) => {
              if (term !== "") router.push(`/home/results?search=${term}`)
            }}
            text={search}
          />
        </div>
        
        {/* 
          <div className="flex flex-row items-center">
          <div 
            className="hover:cursor-pointer hover:text-amber-200 flex-row flex items-center" 
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            onClick={() => setPopupResultsActive(true)}
          >
            <p className="mr-2">Search</p>
            <Search 
              size={30} 
              color={isHover 
                ? "#fee685"
                : "white"}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
        */}
       
        <Link 
          className="m-5 text-xl flex flex-row items-center bg-white p-1.5 text-zinc-800 rounded-sm border-0 hover:bg-gray-200
          2xl:h-10 md:h-9 sm:h-8" 
          href={"https://github.com/samuelrubiodev"} 
          target="_blank">
            <CircleUserRound size={30} className="mr-2" />
            <p className="2xl:text-xl lg:text-xs sm:text-xs max-sm:text-xs">My Account</p>
        </Link>
      </header>
      <hr className="text-zinc-700 mb-0.5"/>
    </div>
  );
}