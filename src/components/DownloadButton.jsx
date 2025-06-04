import React from "react";

const DownloadButton = ({ url }) => {
  if (!url) return null;

  return (
    <div className="w-full text-center mt-6">
      <a
        href={url}
        download="enhanced-image.jpg"
        className="inline-block text-blue-700 font-medium bg-blue-100 px-5 py-2 rounded-full hover:bg-blue-200 hover:text-blue-900 transition duration-300 shadow-sm"
      >
        Download Enhanced Image
      </a>
    </div>
  );
};

export default DownloadButton;
