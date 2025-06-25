"use client";

import Link from "next/link"
import { CircleUserRound, HomeIcon, Film } from 'lucide-react';
import { useState } from "react";
import SearchMovie from "./SearchMovie";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="sticky top-0 z-50">
      <header className="header-blur flex items-center justify-between px-6 py-4 w-full">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-xl">
            <Film size={28} className="text-white" />
          </div>
          <h1 className="gradient-text text-2xl font-bold tracking-tight">
            NextFlix
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300" 
            href="/home"
          >
            <HomeIcon size={18} />
            <span>Home</span>
          </Link>
          
          <Link 
            className="nav-link px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300" 
            href="/home?entertainmentContent=0"
          >
            Movies
          </Link>
          
          <Link 
            className="nav-link px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"  
            href="/home?entertainmentContent=1"
          >
            TV Shows
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <SearchMovie 
            onSearchChange={setSearch}
            label="Search movies & shows..."
            onKeyPressEnter={(term) => {
              if (term !== "") router.push(`/home/results?search=${term}`)
            }}
            text={search}
          />
        </div>

        {/* User Account */}
        <Link 
          className="btn-primary flex items-center space-x-2 px-4 py-2" 
          href="https://github.com/samuelrubiodev" 
          target="_blank"
        >
          <CircleUserRound size={20} />
          <span className="hidden sm:inline">Account</span>
        </Link>
      </header>
    </div>
  );
}