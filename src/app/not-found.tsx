import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-4xl">Not Found</h2>
      <p className="text-shadow-md">Could not find requested resource</p>
      <Link 
        href="/" 
        className="bg-blue-400 p-2 mt-2 rounded-2xl border-1 hover:bg-blue-500 transition-colors duration-150 ease-in-out"
      >
        <p>Return Home</p>
      </Link>
    </div>
  );
};