import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PageProps = {
  pages: number[],
  defaultPage: number,
  onChange: (page:number) => void
}

export default function Page(props: PageProps) {
  const [actualPage, setActualPage] = useState(props.defaultPage);

  const handlePageChange = (page: number) => {
    setActualPage(page);
    props.onChange(page);
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="glass flex items-center rounded-2xl p-2 space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => actualPage > 1 && handlePageChange(actualPage - 1)}
          disabled={actualPage === 1}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {props.pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              actualPage === page
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => actualPage < props.pages.length && handlePageChange(actualPage + 1)}
          disabled={actualPage === props.pages.length}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}