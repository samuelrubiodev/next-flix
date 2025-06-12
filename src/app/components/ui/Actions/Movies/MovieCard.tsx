import Image from "next/image"

export type MovieCardProps = {
  title: string,
  posterImage: string,
  overiew: string,
  relaseDate: Date,
  genres: string[],
  voteAverage: number
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <div className="w-3xs h-120 bg-gray-200 border-1 border-gray-500">
      <div className="flex justify-center">
        <Image
          src={props.posterImage}
          alt="Image"
          width={200}
          height={100}
          className="w-full h-full"
          priority
        />
      </div>
      <div className="flex wrap-anywhere justify-around items-center text-black">
        <div className="text-4xl m-2 p-1 bg-emerald-200 border-s-3 rounded-br-2xl rounded-e-2xl">
          {`${Math.round(props.voteAverage)}`}
        </div>
        <h1 className="m-2 hover:underline" >{props.title} {`(${props.relaseDate.getFullYear()})`}</h1>
      </div>
    </div>
  )
}