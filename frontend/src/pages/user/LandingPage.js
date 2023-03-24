import React from "react";
import Navbar from "../../components/Navbar";

function LandingPage() {
  return (
    <div className="mx-12">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center">
        <div className="ml-10 w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <h1 className="font-sans font-bold text-5xl text-gray-800 text-left mt-4 font-quicksand sans-serif text-43121d">
            Good food choices <br></br> are good <br></br> investments
          </h1>
          <p className="font-semibold text-xl text-gray-600 text-left mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
            purus a odio finibus bibendum amet leo.
          </p>
        </div>
        <img
          className="transform scale-x-[-1] w-1/2 ml-auto object-cover -mx-12"
          src="https://expertphotography.b-cdn.net/wp-content/uploads/2019/02/food-photography-examples-20.jpg"
          alt=""
        ></img>
      </div>
      
      <div >

      <div className=" flex flex-col md:flex-row items-center">
        <img
          className="rounded-lg w-1/2 ml-auto object-scale-down"
          src="http://demo.tutsflow.com/foodera/images/features/1.png"
          alt=""
          ></img>
        <div className="ml-10 w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <h1 className="font-sans font-bold text-5xl text-gray-800 text-left mt-4 font-quicksand sans-serif text-43121d">
          When a man's stomach is full it makes no
difference whether he is rich or poor.
          </h1>
          <p className="font-semibold text-xl text-gray-600 text-left mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
            purus a odio finibus bibendum amet leo.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        <div className="ml-10 w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <h1 className="font-sans font-bold text-5xl text-gray-800 text-left mt-4 font-quicksand sans-serif text-43121d">
          We pride ourselves on making real food from the best ingredients.
          </h1>
          <p className="font-semibold text-xl text-gray-600 text-left mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
            purus a odio finibus bibendum amet leo.
          </p>
        </div>
        <img
          className="transform scale-x-[-1] w-1/2 ml-auto object-cover"
          src="http://demo.tutsflow.com/foodera/images/features/2.png"
          alt=""
          ></img>
      </div>

      </div>

    </div>
  );
}

export default LandingPage;
