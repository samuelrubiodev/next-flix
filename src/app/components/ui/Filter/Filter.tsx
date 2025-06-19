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
      <div className='flex flex-row items-center ml-5 mr-5'>
        <Funnel 
          size={40} 
          color={isHover ? "black" : "white"} 
          className="hover:cursor-pointer hover:bg-white h-12 w-12 hover:rounded-sm border-0 pb-2 pt-2 
            transition-colors duration-150 ease-in-out" 
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            const isFilterActive = isActive 
                ? false
                : true;

            props.onClick(isFilterActive);
            setActive(isFilterActive);
          }}
        />
      </div>
    </div>
    
  )
}