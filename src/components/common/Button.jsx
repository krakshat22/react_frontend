import React from "react";

// Simple, Lucide-ready Button component
const Button = ({
  content,
  icon,
  onClick,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hoverBgColor = "hover:bg-blue-700",
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium 
      ${bgColor} ${textColor} ${hoverBgColor} w-full transition ${className}
    `}
  >
    {icon}
    <span>{content}</span>
  </button>
);

export default Button;
