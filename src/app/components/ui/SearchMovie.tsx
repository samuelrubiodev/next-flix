"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export type SearchMovieProps = {
  text?: string,
  label?: string,
  onKeyPressEnter?: (searchTerm: string) => void; 
  onSearchChange: (searchTerm: string) => void,
};

export default function SearchMovie(props: SearchMovieProps) {
  const [searchTerm, setSearchTerm] = useState(props.text || "");
  const [isFocused, setIsFocused] = useState(false);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    props.onSearchChange(newSearchTerm);
  }

  return (
    <div className={`relative flex items-center w-full transition-all duration-300 ${
      isFocused ? 'transform scale-105' : ''
    }`}>
      <div className="relative w-full">
        <Search 
          size={20} 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
            isFocused ? 'text-red-500' : 'text-gray-400'
          }`} 
        />
        <input 
          type="text" 
          className={`search-input w-full pl-12 pr-12 py-3 text-white placeholder-gray-400 transition-all duration-300 ${
            isFocused ? 'bg-white/20 border-red-500 shadow-lg shadow-red-500/20' : ''
          }`}
          placeholder={props.label || "Search movies & shows..."}
          spellCheck={false}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && props.onKeyPressEnter) {
              props.onKeyPressEnter(searchTerm);
            }
          }}
        />
        {searchTerm !== "" && (
          <button
            onClick={() => {
              setSearchTerm("");
              props.onSearchChange("");
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}