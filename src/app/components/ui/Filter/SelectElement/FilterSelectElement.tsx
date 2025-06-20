import { ReactNode } from "react"

type FilterSelectElementProps = {
  children: ReactNode,
  value: string,
}

export default function FilterSelectElement(props: FilterSelectElementProps) {
  return (
    <option 
      value={props.value}
    >
      {props.children}
    </option>
  );
}