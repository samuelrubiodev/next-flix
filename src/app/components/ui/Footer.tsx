import Link from "next/link"
import { Github, CircleUserRound, HomeIcon, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-gradient mt-20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-xl">
                <HomeIcon size={24} className="text-white" />
              </div>
              <h3 className="gradient-text text-xl font-bold">NextFlix</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for discovering movies and TV shows. 
              Powered by TMDB API for the latest entertainment content.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link 
                href="/home" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <HomeIcon size={16} />
                <span>Home</span>
              </Link>
              <Link 
                href="/home?entertainmentContent=0" 
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                Movies
              </Link>
              <Link 
                href="/home?entertainmentContent=1" 
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                TV Shows
              </Link>
            </div>
          </div>

          {/* Developer Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Developer</h4>
            <div className="space-y-3">
              <Link 
                href="https://github.com/samuelrubiodev" 
                target="_blank"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <CircleUserRound size={16} />
                <span>Samuel Rubio</span>
              </Link>
              <Link 
                href="https://github.com/samuelrubiodev/next-flix" 
                target="_blank"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github size={16} />
                <span>Source Code</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2024 NextFlix. Built with Next.js and TMDB API.
          </p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>by Samuel Rubio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}