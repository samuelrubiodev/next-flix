import Image from "next/image";

export type MovieCardProps = {
  title: string;
  posterImage: string;
  overiew: string;
  releaseDate: Date;
  genres: string[];
  voteAverage: number;
};

export default function MovieCard(props: MovieCardProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-black shadow-lg">
      <div className="aspect-[2/3] w-full relative">
        <Image
          src={props.posterImage}
          alt={`Póster de ${props.title}`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex h-28 flex-col justify-between p-3">
        <div>
          <h1 className="truncate text-base font-bold text-white hover:underline md:text-lg" title={props.title}>
            {props.title}
          </h1>
          <p className="text-sm text-gray-400">{props.releaseDate.getFullYear()}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-emerald-500 p-1 px-2 text-white">
            <p className="font-bold">{`${Math.round(props.voteAverage * 10)}%`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}