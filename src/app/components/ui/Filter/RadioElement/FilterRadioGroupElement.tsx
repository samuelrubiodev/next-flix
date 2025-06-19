import { Children, ReactNode } from "react"

type FilterRadioGroupElement = {
  children: ReactNode
}

export default function FilterRadioGroupElement(props: FilterRadioGroupElement) {
  const childrenArray = Children.toArray(props.children);

  return (
    <div className="flex flex-row items-center rounded-sm border-0 bg-zinc-800 justify-self-start p-1 ml-2 mr-2">
      {childrenArray.map((filterElement,i) => (
        <div key={i} className="">
          {filterElement}
        </div>
      ))}
    </div>
  )
}