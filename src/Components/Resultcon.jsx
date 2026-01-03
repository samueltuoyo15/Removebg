import React, { useEffect } from "react";
import { useRef } from "react";
import { assets } from "../../public/assets/assets";
import { useStore } from "../Store/useStore";

const Resultcon = () => {
  const {
    imagePreview,
    resetImageFlopw,
    startRemoveBgFlow,
    removeBackground,
    processedImage,
    loading,
    downloadImage,
    selectedColor,
    setSelectedColor
  } = useStore();
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);
  useEffect(() => {
    if (processedImage && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (imagePreview) {
      removeBackground();
    }
  }, [processedImage, imagePreview]);

  return (
    <div className="bg-gray-100 w-full h-100vh rounded-xl p-4 md:p-6 my-10 md:my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 text-sm font-semibold">Original</p>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt=""
              className="rounded-md cursor-pointer"
              onClick={() => {
                resetImageFlopw();
                fileInputRef.current.click();
              }}
            />
          ) : (
            <div
              className="w-full h-80 bg-white rounded-md flex justify-center items-center m-auto cursor-pointer"
              onClick={() => {
                resetImageFlopw();
                fileInputRef.current.click();
              }}
            >
              <div className="text-center flex flex-col justify-center items-center">
                <img
                  src="../../public/assets/image_icon.svg"
                  alt=""
                  className="w-20 mb-4"
                />
                <p className="text-gray-400">
                  Upload Image to <br /> revome Background
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              if (e.target.files[0]) {
                startRemoveBgFlow(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 text-sm font-semibold">
            Background removed
          </p>
          <div
            className={`rounded-md border border-gray-300 h-50 ${processedImage && "h-full"
              } md:h-full relative overflow-hidden ${!selectedColor ? 'bg-layer' : ''}`}
            style={{ backgroundColor: selectedColor || 'transparent' }}
          >
            {/* <img src={assets.image_wo_bg} alt="" className='rounded-md' /> */}
            {loading && (
              <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="border-4 border-[#17565D] rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
              </div>
            )}

            {!loading && processedImage && (
              <img
                src={processedImage}
                alt="processed"
                className="rounded-md transform transition-all duration-700 ease-out opacity-0 translate-x-10"
                key={processedImage} // triggers re-render when image changes
                onLoad={(e) => {
                  e.currentTarget.classList.remove(
                    "opacity-0",
                    "translate-x-10"
                  );
                  e.currentTarget.classList.add("opacity-100", "translate-x-0");
                }}
              />
            )}
          </div>
          {processedImage && (
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer overflow-hidden ${!selectedColor ? 'ring-2 ring-offset-1 ring-gray-400' : ''}`}
                onClick={() => setSelectedColor(null)}
                title="Original"
              >
                <div className="w-full h-full bg-layer opacity-60"></div>
              </button>
              {['#000000', '#FFFFFF', '#FF4D4D', '#3B82F6', '#22C55E', '#FACC15', '#A855F7', '#EC4899'].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 border border-gray-200 ${selectedColor === color ? 'ring-2 ring-offset-1 ring-gray-500 scale-110' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-5">
        <button
          className="cursor-pointer px-3 md:px-4 py-2.5 text-[#17565D] border-[#17565D] border rounded-full hover:scale-105 transition-all duration-700"
          onClick={() => {
            resetImageFlopw();
            fileInputRef.current.click();
          }}
        >
          Try another image
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files[0]) {
              startRemoveBgFlow(e.target.files[0]);
            }
          }}
        />
        <div
          onClick={() => downloadImage()}
          className="cursor-pointer px-3 md:px-4 py-2.5 text-white bg-[#17565D]  rounded-full hover:scale-105 transition-all duration-700"
        >
          Download image
        </div>
      </div>
    </div>
  );
};

export default Resultcon;
