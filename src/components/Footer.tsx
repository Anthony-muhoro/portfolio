import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="text-lg font-semibold">My Portfolio</h3>
            <p className="mt-2 text-sm">Showcasing my skills and projects</p>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <ul className="flex justify-center space-x-4">
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  <Github size={24} />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  <Linkedin size={24} />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition duration-300">
                  <Twitter size={24} />
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0 text-center md:text-right">
            <p className="text-sm">&copy; 2024 My Portfolio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;