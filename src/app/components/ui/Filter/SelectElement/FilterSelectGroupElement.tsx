import { Children, ReactNode } from "react"

type FilterSelectGroupElement = {
  children: ReactNode,
  name: string
}

export default function FilterSelectGroupElement(props: FilterSelectGroupElement) {
  const childrenArray = Children.toArray(props.children);

  return (
    <div className="flex flex-row items-center rounded-sm border-0 p-1 ml-2 mr-2">
      <select name={props.name} id="select" 
        className="bg-zinc-900 rounded-sm border-0 ring-0 border-none text-white h-10
          2xl:text-lg 
          xl:text-lg 
          lg:text-sm 
          md:text-sm 
          sm:text-sm 
          max-sm:text-sm
          
          2xl:h-10
          xl:h-10
          lg:h-8
          md:h-7
          sm:h-5
          max-sm:h-5
        ">
        {childrenArray.map((filterElement) => (
          filterElement
        ))}
      </select>
      
    </div>
  );
}