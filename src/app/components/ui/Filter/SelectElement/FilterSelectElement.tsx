import { ReactNode } from "react"

type FilterSelectElementProps = {
  children: ReactNode
}

export default function FilterSelectElement(props: FilterSelectElementProps) {
  return (
    <option 
      value={props.children?.toString()}
    >
      {props.children}
    </option>
  );
}