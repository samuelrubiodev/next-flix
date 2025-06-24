import { ReactNode } from "react"

type FilterGroupProps = {
  children: ReactNode
}

export default function FilterGroup(props: FilterGroupProps) {
  return <div className="flex ml-2 flex-row items-center rounded-sm border-0 bg-zinc-800 justify-self-start">
    {props.children}
  </div>
}