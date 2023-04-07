import React from "react";
import Category from "../../components/Categoryresource";
import Food from "../../components/Food";
import HeadlineCards from "../../components/HeadlineCards";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

function HomePage() {
  return (
    <div className="mx-20">
      <Navbar />
      <Hero />
      <HeadlineCards />
      <Food />
      <Category />
    </div>
  );
}

export default HomePage;
