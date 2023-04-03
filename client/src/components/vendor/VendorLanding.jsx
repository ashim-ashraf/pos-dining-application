import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function VendorLanding() {

    let listedStatus = useSelector((state) => state.admin);

    const handleClick = (e) => {

    }

  return (
    <>
    { listedStatus?( <div class="relative h-screen">
  <img class="absolute h-[500px] w-full object-cover top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="https://www.shutterstock.com/image-photo/overhead-shot-ingredients-classic-italian-260nw-1630222978.jpg" alt="description"/>
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 class="text-4xl font-bold text-white">Never get it too late </h1>
    <h2 class="text-2xl text-gray-200 mb-8">List your restautaurants in a go</h2>
    <div>
      <Link to={'/vendors/registration'} class="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-emerald-500 hover:to-cyan-500  text-white rounded-full mr-4">Publish Restaurant</Link>
      
    </div>
  </div>
</div>): (
    <div>listed restaurant</div>
)}
     
      
    </>
  );
}