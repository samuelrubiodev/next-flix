/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Funnel } from 'lucide-react';
import { useState } from 'react';

type FilterProps = {
  onClick: (isActive: boolean) => void;
}

export default function Filter(props: FilterProps) {
  const [isHover, setHover] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <div className='flex self-center'>
      <button 
        className={`p-3 rounded-xl transition-all duration-300 ${
          isActive 
            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
            : 'glass text-gray-300 hover:text-white hover:bg-white/20'
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          const isFilterActive = !isActive;
          props.onClick(isFilterActive);
          setActive(isFilterActive);
        }}
      >
        <Funnel 
          size={24} 
          className={`transition-transform duration-300 ${
            isActive ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  )
}