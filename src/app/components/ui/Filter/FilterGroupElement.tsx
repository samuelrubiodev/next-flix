import { Children, ReactNode } from "react"

type FilterGroupElement = {
  children: ReactNode,
  row: boolean
}

export default function FilterGroupElement(props: FilterGroupElement) {
  const childrenArray = Children.toArray(props.children);

  return (
    <form className={`flex ${props.row ? "flex-row" : "flex-col"} items-center`} method="GET">
      {childrenArray.map((filterElement) => (
        filterElement
      ))}
    </form>
  );
}