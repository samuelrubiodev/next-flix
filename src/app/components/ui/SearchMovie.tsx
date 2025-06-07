"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export type SearchMovieProps = {
  onSearchChange: (searchTerm: string) => void;
};

export default function SearchMovie(props: SearchMovieProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    props.onSearchChange(newSearchTerm);
  }

  return (
    <div className="bg-white h-15 flex flex-row items-center justify-center p-2">
      <Search size={30} color="black"/>
      <input 
        type="text" 
        id="input" 
        name="search" 
        className="bg-white text-black w-full ml-2 focus:outline-none" 
        placeholder="Enter movie or series"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  )
}