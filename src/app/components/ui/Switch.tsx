import { ReactElement, useState } from "react";

type SwitchProps = {
  children: ReactElement[],
  className?: string,
  selectedIndex?: number,
  onChange: (selectedIndex: number) => void
};

export default function Switch(props: SwitchProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(props.selectedIndex || 0);

  return (
    <div className={props.className}>
      <div className={`flex rounded-2xl border-2 border-gray-400 bg-gray-400 w-full h-full`}>
        <div 
          className="flex items-center h-full w-full justify-around"
          >
          {props.children.map((children, i) => (
            <div 
              className={`text-xl ml-2 rounded-sm pl-2 pr-2 border-0 hover:cursor-pointer hover:bg-slate-600 ${
                selectedIndex === i ? 'bg-slate-500' : 'bg-transparent'
              }`}
              key={i}
              onClick={() => {
                setSelectedIndex(i);
                props.onChange(i);
              }}
            >
              {children}
            </div>
          ))}
          </div>
      </div>
    </div>
  );
};