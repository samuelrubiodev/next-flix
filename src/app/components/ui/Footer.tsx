import Link from "next/link"

export default function Footer() {
  return (
    <div className="fixed left-0 bottom-0 w-full h-30">
      <footer className="h-full w-full bg-blue-400">
        <div className="flex flex-row relative justify-center items-center">
          <Link href={"/home"} className="hover:cursor-pointer hover:text-amber-200 m-2">
            <p>Home</p>
          </Link>
          <Link href={"/home"} className="hover:cursor-pointer hover:text-amber-200 m-2">
            <p>My Account</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
