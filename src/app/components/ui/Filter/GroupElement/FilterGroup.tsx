import { ReactNode } from "react"

type FilterGroupProps = {
  children: ReactNode
}

export default function FilterGroup(props: FilterGroupProps) {
  return <div className="flex ml-2 flex-row items-center rounded-sm border-0 bg-zinc-800 justify-self-start
    2xl:h-12
    xl:h-12
    lg:h-10
    md:h-7
    sm:h-5
  ">
    {props.children}
  </div>
}