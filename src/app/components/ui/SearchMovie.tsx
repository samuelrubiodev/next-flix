"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export type SearchMovieProps = {
  text?: string,
  onSearchChange: (searchTerm: string) => void;
};

export default function SearchMovie(props: SearchMovieProps) {
  const [searchTerm, setSearchTerm] = useState(props.text || "");
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    props.onSearchChange(newSearchTerm);
  }

  return (
    <div className="bg-slate-300 h-15 ml-2 mr-2 text-slate-300 focus-within:text-[#c3defd] rounded-2xl border-2 
        border-black flex flex-row items-center justify-center p-2 
        focus-within:bg-[#bdcbdb] transition-colors duration-150 ease-in-out flex-grow"
      >
        <Search size={30} color="black" />
        <input 
          type="text" 
          id="input" 
          name="search" 
          className="bg-transparent text-black w-full ml-2 focus:outline-none" 
          placeholder="Enter movie or series"
          value={searchTerm}
          onChange={handleInputChange}
        />
    </div>
  );
}