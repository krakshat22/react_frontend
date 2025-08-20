import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e)=>{
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('language' , e.target.value);
  }

  return (
    <select
      onChange={handleChange}
      value={i18n.language}
      className="border rounded-lg px-2 py-1 bg-gray-100 border-none mt-1 text-lg"
    >
      <option value="en">English</option>
      <option value="ml">Malay</option>
      <option value="zh">Chinese</option>
    </select>
  );
};

export default LanguageSelector;
