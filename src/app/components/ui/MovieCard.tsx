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
    <div className="w-3xs h-120 bg-gray-200">
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
      <div className="flex wrap-anywhere justify-between items-center  text-black">
        <div className="text-3xl rounded-2xl border-2 m-2 p-2 bg-emerald-200">
          {Math.round(props.voteAverage)}
        </div>
        <h1 className="m-2" >{props.title} {`(${props.relaseDate.getFullYear()})`}</h1>
      </div>
    </div>
  )
}