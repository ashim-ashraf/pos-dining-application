import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [data, setData] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("/api/admin/get-banners")
      .then((res) => {
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
            className="flex  overflow-x-auto gap-6 snap-x snap-mandatory   after:shrink-0 after:w-[30vw] scrollbar-hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data &&
              data?.map((item) => (
                <li className="shrink-0 cursor-pointer snap-center" onClick={() => navigate("/restaurant"+item.url)} >
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

      <div className="hidden md:block  ">
      <div className="px-28 mt-4 overflow-hidden overflow-y-hidden p-10 bg-pink-800 ">
          <ul
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory overflow-y-hidden no-scrollbar "
          >
            {data &&
              data?.map((item) => (
                <li className="shrink-0 cursor-pointer snap-center overflow-y-hidden" onClick={() => navigate("/restaurant"+item.url)}>
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
