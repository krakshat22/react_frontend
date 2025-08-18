import React from "react";

const FilePicker = ({ label, onFiles, variant = "blue", capture }) => {
  let classes =
    variant === "outline"
      ? "flex items-center justify-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition shadow-sm w-full"
      : "flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium cursor-pointer hover:bg-blue-700 transition shadow w-full";
  return (
    <label className={classes}>
      {label}
      <input
        hidden
        type="file"
        accept="image/*"
        multiple
        {...(capture ? { capture } : {})}
        onChange={(e) => e.target.files && onFiles(e.target.files)}
      />
    </label>
  );
};

export default FilePicker;
