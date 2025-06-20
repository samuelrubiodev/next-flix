import { ReactNode, useId } from "react";

type FilterRadioElementProps = {
  children: ReactNode;
  name?: string;
}

export default function FilterRadioElement(props: FilterRadioElementProps) {
  const uniqueId = useId();

  return (
    <label 
      htmlFor={uniqueId} 
      className="mr-2 ml-2 flex items-center p-1 rounded-sm
        hover:bg-zinc-900 transition-colors duration-300 ease-in-out cursor-pointer"
    >
      <input 
        type="radio" 
        id={uniqueId} 
        value={props.children?.toString()}
        name={props.name || "radio"} 
        className="hidden peer" 
      />
      <span 
        className="w-5 h-5 border-2 border-gray-500 rounded-full 
          flex items-center justify-center
          peer-checked:border-blue-500"
      >
        <span 
          className="w-2.5 h-2.5 rounded-full bg-blue-500 
            scale-0 peer-checked:scale-100
            transition-transform duration-150 ease-in"
        >
        </span>
      </span>
      <span className="ml-2">{props.children}</span>
    </label>
  );
}