import { Children, ReactNode } from "react"

type FilterRadioGroupElement = {
  children: ReactNode
}

export default function FilterRadioGroupElement(props: FilterRadioGroupElement) {
  const childrenArray = Children.toArray(props.children);

  return (
    <div className="flex flex-row items-center rounded-sm border-0 bg-zinc-800 h-12 justify-self-start p-1 ml-2 mr-2
      2xl:h-12
      xl:h-12
      lg:h-10
      md:h-7
      sm:h-5
    ">
      {childrenArray.map((filterElement,i) => (
        <div key={i} className="">
          {filterElement}
        </div>
      ))}
    </div>
  )
}