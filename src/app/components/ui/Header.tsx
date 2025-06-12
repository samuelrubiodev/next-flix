import Link from "next/link"
import { CircleUserRound, HomeIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-around bg-black w-full h-20">
      <h1 className="m-5 text-3xl text-white-300">Next Flix</h1>
      <Link className="m-5 text-xl hover:text-amber-200 flex flex-row items-center" href={"/home"}>
        <HomeIcon size={20} className="mr-2"/>
        <p>Home</p>
      </Link>
      <div className="w-1/2 flex justify-center">
        <Link className="m-5 text-xl hover:text-amber-200" href={"/home?entertainmentContent=0"}>Movies</Link>
        <Link className="m-5 text-xl hover:text-amber-200" href={"/home?entertainmentContent=1"}>Series</Link>
      </div>
        <Link 
          className="m-5 text-xl flex flex-row items-center hover:text-amber-200" 
          href={"https://github.com/samuelrubiodev"} 
          target="_blank">
            <CircleUserRound size={30} className="mr-2" />
            <p>My Account</p>
      </Link>
    </header>
  );
}