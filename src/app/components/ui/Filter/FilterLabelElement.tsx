import { ReactNode } from "react"

type FilterLabelElement = {
  children: ReactNode
}

export default function FilterLabelElement(props: FilterLabelElement) {
  return (
    <div className="p-2 flex items-center h-full">
      <p className="2xl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-sm max-sm:text-sm">{props.children}</p>
    </div>
  )
}