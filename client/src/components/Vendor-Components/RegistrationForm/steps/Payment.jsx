import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Payment({image, setImage, imageErrors}) {
 
  const [selectedImage, setSelectedImage] = useState([])

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file);
    setSelectedImage(file);
  }

  // function handledrop(e) {
  //   e.preventDefault()
  //   if (images.length <= 6) {
  //       const files = Array.from(e.dataTransfer.files)
  //       setImages([...images, ...files])
  //   }}

  // const removeImage = (name) => {
  //   setImages((prevImages) => prevImages.filter((img) => img.name !== name))
  // }

  return (
    <div className="w-full border-dashed border-2 border-gray-400 py-12">
      <Toaster toastOptions={{ duration: 4000 }} />
      <label
        htmlFor="image-upload"
        className="block text-gray-700 font-bold text-center mb-2"
      >
        Select images to upload:
      </label>
      {/* <p>{imageErrors}</p> */}
      <div className="relative w-full h-12 rounded-lg overflow-hidden">
        <div className="w-0 h-full bg-blue-500 absolute left-0 top-0"></div>
        <input
          id="image-upload"
          type="file"
          name="image"
          className="opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer"
          onChange={handleImageChange}
          single
        />
        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
          {image ? (
            typeof image === "string" ? (
              <img
                src={image}
                alt="Selected"
                className="h-full max-w-none mx-2 my-1 object-contain"
                style={{ maxHeight: "500px", maxWidth: "600px" }}
              />
            ) : (
              <img
                src={
                  image instanceof Blob
                    ? URL.createObjectURL(image)
                    : ""
                }
                alt="Selected"
                className="h-full max-w-none mx-2 my-1 object-contain"
                style={{ maxHeight: "500px", maxWidth: "600px" }}
              />
            )
          ) : (
            <span className="text-gray-700">No image selected</span>
          )}
        </div>
      </div>
    </div>
  );
}
