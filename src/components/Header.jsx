import { ChevronLeft } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  console.log("t from i18n in Header component: " , t);

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3 flex items-center gap-3">
      <button
        className="text-gray-800 text-xl px-2 focus:outline-none"
        aria-label="Back"
      >
        <ChevronLeft />
      </button>
      <div className="text-base font-medium tracking-wide">
        {t("trip_id")}{" "}
        <span className="font-bold text-gray-800">T25030056</span>
      </div>
    </header>
  );
};

export default Header;
