import DownloadButton from "./DownloadButton"; // adjust path as needed
import React, { useEffect, useState } from "react";
import axios from "axios";

const ImagePreview = ({ file, setFile }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [enhancedUrl, setEnhancedUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload state

  const API_KEY = "wxnoa7x5vzjwqihow";

  useEffect(() => {
    if (!file) {
      setImageUrl(null);
      setEnhancedUrl(null);
      setIsUploading(false);
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);

    uploadImageToAPI(file);

    return () => URL.revokeObjectURL(url);
  }, [file]);

const uploadImageToAPI = async (file) => {
  setIsUploading(true); // Set uploading state to true
  const formData = new FormData();
  formData.append("image_file", file);

  try {
    const res = await axios.post(
      "https://techhk.aoscdn.com/api/tasks/visual/scale",
      formData,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );
    console.log("Full upload response:", res);
    console.log("Response data:", res.data);

   const taskId = res.data.data.id || res.data.data.task_id || (res.data.data.job && res.data.data.job.id);

console.log("Possible Task ID:", taskId);

if (!taskId) {
  console.error("Task ID is undefined in response data keys:", Object.keys(res.data.data));
  setIsUploading(false);
  return;
}

    console.log("Upload Success, Task ID:", taskId);

    // Wait a few seconds before fetching result
    setTimeout(() => {
      fetchEnhancedResult(taskId);
    }, 4000);
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    setIsUploading(false);
  }
};

const fetchEnhancedResult = async (taskId) => {
  try {
    const res = await axios.get(
      `https://techhk.aoscdn.com/api/tasks/visual/scale/${taskId}`,
      {
        headers: {
          "x-api-key": API_KEY
        }
      }
    );

    console.log("Fetch result full response data:", res.data);

    const enhancedImage =
      res.data.data.url ||
      res.data.data.result_url ||
      res.data.data.enhanced_image_url ||
      res.data.data.image_url ||
      res.data.data.image;

    if (!enhancedImage || !enhancedImage.startsWith("http")) {
      console.error("Enhanced image URL not found or invalid in response data keys:", Object.keys(res.data.data));
      setIsUploading(false);
      return;
    }

    setEnhancedUrl(enhancedImage);
    setIsUploading(false); // Set uploading state to false when done
  } catch (error) {
    console.error("Fetch result error:", error.response?.data || error.message);
    setIsUploading(false);
  }
};

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center gap-6">
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
        <div className="flex flex-col items-center border rounded-lg p-4 shadow-sm w-full md:w-1/2 bg-gray-50">
          <h2 className="mb-4 text-xl font-semibold">
            Original Image
          </h2>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Original Upload"
              className="max-w-full max-h-64 object-contain rounded-md"
            />
          )}
        </div>
        <div className="flex flex-col items-center border rounded-lg p-4 shadow-sm w-full md:w-1/2 bg-gray-50">
          <h2 className="mb-4 text-xl font-semibold">
            Enhanced Image
          </h2>
          {enhancedUrl ? (
            <img
              src={enhancedUrl}
              alt="Enhanced Result"
              className="max-w-full max-h-64 object-contain rounded-md"
            />
          ) : isUploading ? (
            <p className="italic">Enhancing image...</p>
          ) : null}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <DownloadButton url={enhancedUrl} />
      </div>
    </div>
  );
}

export default ImagePreview;