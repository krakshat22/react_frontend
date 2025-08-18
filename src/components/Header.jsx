import { ChevronLeft } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-3">
      <button className="text-gray-800 text-xl px-2 focus:outline-none" aria-label="Back">
        <ChevronLeft />
      </button>
      <div className="text-base font-medium tracking-wide">
      Trip Id: <span className="font-bold text-gray-800">T25030056</span>
    </div>
    </header>
  );
};

export default Header;
