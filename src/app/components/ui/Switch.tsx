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
      <div className="glass flex rounded-2xl p-1 w-full h-full">
        <div className="flex items-center h-full w-full justify-around relative">
          {/* Sliding indicator */}
          <div 
            className="absolute top-1 bottom-1 bg-gradient-to-r from-red-600 to-red-700 rounded-xl transition-all duration-300 ease-out shadow-lg"
            style={{
              left: `${(selectedIndex || 0) * 50}%`,
              width: '50%',
              transform: 'translateX(2px)',
              right: 'auto'
            }}
          />
          
          {props.children.map((children, i) => (
            <button 
              className={`relative z-10 font-semibold rounded-xl px-4 py-2 transition-all duration-300 ${
                selectedIndex === i 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              key={i}
              onClick={() => {
                setSelectedIndex(i);
                props.onChange(i);
              }}
            >
              {children}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}