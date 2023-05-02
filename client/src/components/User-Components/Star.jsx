import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";


const Star = ({ stars, reviews }) => {
    console.log("in star", stars );
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <div className="mt-1">
      <div className="icon-style flex gap-1 ">
        {ratingStar}
        <p>({reviews} customer reviews)</p>
      </div>
     </div>

  );
};



export default Star;
