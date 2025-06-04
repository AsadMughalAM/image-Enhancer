import React from 'react'
import { UploadCloud } from 'lucide-react'

const ImageUpload = (props) => {
  const handleFileChange = (e) => {
    props.setFile(e.target.files[0]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300 shadow-sm w-full">
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center space-y-3 text-center cursor-pointer"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300">
            <UploadCloud className="w-8 h-8" />
          </div>
          <span className="text-lg font-semibold hover:text-blue-700">
            Upload your Image for Enhancement
          </span>
          <span className="text-sm">
            AI-powered image enhancement — supported formats: JPG, PNG, GIF
          </span>
        </label>
        <input type="file" className="hidden" id="fileInput" accept=".jpg,.jpeg,.png,.gif"
          onChange={handleFileChange} />
      </div>
    </div>
  )
}

export default ImageUpload
