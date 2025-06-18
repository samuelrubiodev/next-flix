import Image from "next/image"

type TvShowCardProps= {
    name: string,
    posterImage: string,
    overview: string,
    first_air_date: Date,
    genre_ids: number[],
    vote_average: number
}

export default function TvShowCard(props: TvShowCardProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-black shadow-lg">
      <div className="aspect-[2/3] w-full relative">
        <Image
          src={props.posterImage}
          alt="Image"
          width={200}
          height={100}
          className="w-full h-full"
          priority
        />
      </div>
      <div className="flex h-28 flex-col justify-between p-3">
        <div>
          <h1 className="truncate text-base font-bold text-white hover:underline md:text-lg" title={props.name}>
            {props.name}
          </h1>
          <p className="text-sm text-gray-400">{props.first_air_date.getFullYear()}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-md bg-emerald-500 p-1 px-2 text-white">
            <p className="font-bold">{`${Math.round(props.vote_average * 10)}%`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}