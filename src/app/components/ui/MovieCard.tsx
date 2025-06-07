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
    <div className="w-3xs h-110 bg-gray-200">
      <div className="flex justify-center">
        <Image
          src={props.posterImage}
          alt="Image"
          width={200}
          height={100}
          className="w-full h-full"
        />
      </div>
      <div className="flex pt-1 wrap-anywhere justify-around items-center  text-black">
        <div className="text-2xl rounded-2xl border-2 p-1 bg-emerald-200">
          {props.voteAverage}
        </div>
        <h1 >{props.title} {`(${props.relaseDate.getFullYear()})`}</h1>
      </div>
    </div>
  )
}