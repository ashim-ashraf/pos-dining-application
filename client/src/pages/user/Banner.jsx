import axios from "axios";
import React, { useEffect, useState } from "react";

function Banner() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/api/admin/get-banners")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="block md:hidden">
        <div className=" mt-4 overflow-hidden">
          <ul
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory before:shrink-0 before:w-[40vw] after:shrink-0 after:w-[30vw] scrollbar-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data &&
              data?.map((item) => (
                <li className="shrink-0 snap-center">
                  <img
                    src={item?.image}
                    alt="images"
                    className="w-80 h-auto rounded-lg"
                  ></img>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="hidden md:block p-5 ">
      <div className="px-28 mt-4 overflow-hidden  overflow-y-hidden">
          <ul
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory overflow-y-hidden no-scrollbar"
          >
            {data &&
              data?.map((item) => (
                <li className="shrink-0 snap-center overflow-y-hidden">
                  <img
                    src={item?.image}
                    alt="images"
                    className="w-80 h-auto rounded-lg"
                  ></img>
                </li>
              ))}
          </ul>
        </div>

      </div>
    </>
  );
}

export default Banner;
