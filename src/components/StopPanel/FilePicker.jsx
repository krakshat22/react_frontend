import React from "react";

const FilePicker = ({ label, onFiles, variant = "blue", capture }) => {
  // "blue" = solid, "outline" = border, "ghost" = minimal
  let classes =
    variant === "outline"
      ? "flex items-center justify-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-white text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition"
      : "flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium cursor-pointer hover:bg-blue-700 transition shadow";

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
