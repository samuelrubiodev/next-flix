type PageProps = {
  pages: number[],
  onChange: () => void
}

export default function Page(props: PageProps) {
  return (
    <div className="flex justify-center m-5">
      <div className="flex items-center rounded-2xl border-2 border-gray-400 w-60 h-10 bg-gray-400">
        <div className="flex flex-row">
          {props.pages.map((page) => (
            <div 
              className="ml-2 border-2 rounded-2xl w-10 hover:cursor-pointer hover:bg-gray-500" 
              onClick={() => props.onChange()} 
              key={page}>
                <p className="flex justify-center">{page}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};