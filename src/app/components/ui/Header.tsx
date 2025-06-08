import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-500 w-full h-20">
      <Link className="m-5 text-3xl text-white-300 hover:text-amber-200" href={"/home"}><h1>Next Flix</h1></Link>
      <Link className="m-5 text-xl hover:text-amber-200" href={"/home"}>Home</Link>
      <Link className="m-5 text-xl hover:text-amber-200" href={"/home"}>My Account</Link>
    </header>
  )
}