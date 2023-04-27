import { useState } from "react";
import { useStepperContext } from "../../../../contexts/StepperContext";


export default function Payment() {

  const { userData, setUserData } = useStepperContext();
  const [selectedImages, setSelectedImages] = useState([]);

  function handleImageChange(event) {
    const { name } = event.target;
    const file = event.target.files[0];
    setUserData({ ...userData, [name]: file });
    setSelectedImages(file);
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
      <label htmlFor="image-upload" className="block text-gray-700 font-bold mb-2">
        Select images to upload:
      </label>
      <div className="relative w-full h-12 rounded-lg overflow-hidden">
        <div className="w-0 h-full bg-blue-500 absolute left-0 top-0"></div>
        <input
          id="image-upload"
          type="file"
          name="image"
          className="opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer"
          onChange={handleImageChange}
          multiple
        />
        <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
          {selectedImages.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center h-full max-w-none">
              {selectedImages.map((image, index) => (
                <div key={index} className="w-max h-full mr-2 mb-2">
                  <img src={image} alt={`Selected ${index}`} className="h-full max-w-none mx-2 my-1 object-contain" style={{ maxHeight: '300px', maxWidth: '400px' }}/>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-gray-700">No images selected</span>
          )}
        </div>
      </div>
    </div>
  
  )

}


