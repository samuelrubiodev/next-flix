"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export type SearchMovieProps = {
  text?: string,
  onKeyPressEnter?: (searchTerm: string) => void; 
  onSearchChange: (searchTerm: string) => void,
};

export default function SearchMovie(props: SearchMovieProps) {
  const [searchTerm, setSearchTerm] = useState(props.text || "");
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    props.onSearchChange(newSearchTerm);
  }

  return (
    <div className="bg-zinc-400/30 h-15 ml-2 mr-2 mt-1 focus-within:text-[#c3defd] rounded-lg border-2 
        border-black flex flex-row items-center justify-center p-2 
        focus-within:bg-zinc-400/50 transition-colors duration-150 ease-in-out flex-grow"
      >
        <Search size={30} color="white" />
        <input 
          type="text" 
          id="input" 
          name="search" 
          className="bg-transparent text-zinc-300 w-full ml-2 focus:outline-none" 
          placeholder="Enter movie or series"
          spellCheck={false}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDownCapture={(event) => {
            if (event.nativeEvent instanceof KeyboardEvent 
                && event.nativeEvent.key === "Enter" && props.onKeyPressEnter) {
              props.onKeyPressEnter(searchTerm);
            }
          }}
        />
    </div>
  );
}