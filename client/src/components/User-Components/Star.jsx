import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon text-yellow-500" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon text-yellow-500" />
        ) : (
          <AiOutlineStar className="icon text-yellow-500" />
        )}
      </span>
    );
  });

  return (
    <div className="mb-1">
      <div className="icon-style items-center flex gap-1 ">
        {ratingStar}
        <p>({reviews} reviews)</p>
      </div>
     </div>

  );
};



export default Star;
