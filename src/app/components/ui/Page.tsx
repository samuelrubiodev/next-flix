import { useEffect, useState } from "react";

type PageProps = {
  pages: number[],
  defaultPage: number,
  onChange: (page:number) => void
}

export default function Page(props: PageProps) {
  const [actualPage, setActualPage] = useState(props.defaultPage);

  useEffect(() => {
    console.log(`Actual page: ${actualPage+1}`)
  }, [actualPage]);

  return (
    <div className="flex justify-center m-5">
      <div className="flex items-center rounded-2xl border-2 border-gray-400 w-60 h-10 bg-gray-400">
        <div className="flex flex-row">
          {props.pages.map((page,id) => (
            <div 
              className={`ml-2 border-2 rounded-2xl w-10 
                ${actualPage-1 === id ? 'bg-gray-500' : 'bg-transparent'}
                hover:cursor-pointer hover:bg-gray-600 transition-all duration-150 ease-in-out`} 
              onClick={() => {
                setActualPage(id+1);
                props.onChange(id+1)
              }} 
              key={page}>
                <p className="flex justify-center">{page}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};