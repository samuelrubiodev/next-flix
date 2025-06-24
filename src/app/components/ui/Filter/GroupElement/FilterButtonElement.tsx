import { ReactNode } from "react"

type FilterButtonElementProps = {
  children: ReactNode
}

export default function FilterButtonElement(props: FilterButtonElementProps) {
  return (
    <button 
      type="submit"
      className="ml-5 bg-zinc-800 p-2 rounded-sm border-0 hover:cursor-pointer hover:bg-zinc-900 h-12
        2xl:h-12
        xl:h-12
        lg:h-10
        md:h-7
        sm:h-5
      
      "
    >
      <p className="text-xl">{props.children}</p>
    </button>
  )
}