import { ReactElement, useEffect, useState } from "react";

type SwitchProps = {
  children: ReactElement[],
  className?: string,
  selectedIndex?: number,
  onChange: (selectedIndex: number) => void
};

export default function Switch(props: SwitchProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(props.selectedIndex || 0);

  useEffect(() => {
    if (props.selectedIndex !== undefined && props.selectedIndex !== selectedIndex) {
      setSelectedIndex(props.selectedIndex);
    }
  }, [props.selectedIndex, selectedIndex]);

  return (
    <div className={props.className}>
      <div className={`flex rounded-2xl border-0 bg-zinc-600  w-full h-full`}>
        <div 
          className="flex items-center h-full w-full justify-around"
          >
          {props.children.map((children, i) => (
            <div 
              className={`text-xl ml-2 rounded-sm pl-2 pr-2 border-0 hover:cursor-pointer hover:bg-zinc-800 ${
                selectedIndex === i ? 'bg-zinc-800/50' : 'bg-transparent'
              } transition-all duration-150 ease-in-out`}
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