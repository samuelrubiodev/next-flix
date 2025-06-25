import Link from "next/link"
import { Github, CircleUserRound, HomeIcon } from 'lucide-react';

export default function Footer() {
  return (
    <div className="flex w-full h-30">
      <hr className="text-zinc-700"/>
      <footer className="h-29 w-full bg-black z-50">
        <div className="flex flex-row relative justify-center items-center">
          <Link href={"/home"} className="hover:cursor-pointer hover:text-white text-zinc-300 m-2 flex flex-row items-center">
            <HomeIcon size={20} className="mr-2"/>
            <p>Home</p>
          </Link>
          <Link 
            href={"https://github.com/samuelrubiodev"} 
            target="_blank" 
            className="hover:cursor-pointer hover:text-white text-zinc-300 m-2 flex flex-row items-center">
              <CircleUserRound size={20} className="mr-2" />
              <p>My Account</p>
          </Link>
        </div>
        <div className="relative">
          <div className="relative flex flex-row justify-center mb-1">
            <Link href={"https://github.com/samuelrubiodev/next-flix"} 
              target="_blank"
              className="flex flex-row items-center  hover:text-white text-zinc-300 justify-center ml-2 hover:cursor-pointer hover:underline">
                <Github size={20} />
                <p className="ml-2 flex justify-self-center">Next Flix</p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}