import axios from "axios";
import { Block, List, ListItem } from "konsta/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Rate from "./StarRating";

function Notification() {
  const [visible, setVisible] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const [ratings, setRatings] = useState([]);
  const order = useSelector((state) => state.user.dataForRating);
  const [formdata, setFormdata] = useState({});

  useEffect(() => {
    const restaurantId = order.restaurantId;
    axios
      .get(`/api/users/get-vendor/${restaurantId}`)
      .then((res) => {
        setRestaurantName(res.data.vendorDetails.restaurantName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(restaurantName);
    console.log(ratings);
  }, [ratings, restaurantName]);

  const handleRating = (index, rate, itemId) => {
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings];
      newRatings[index] = { id: itemId, rating: rate };
      return newRatings;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = () => {
    axios.post("/api/users/restaurant-rating", {formdata, ratings}).then(() => {
      console.log(res)
      //dispatch
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Block>
      <div className="mt-4 items-center justify-center ">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">Thank you for dining with us.</p>
            <p> Have a great day! </p>
          </div>
        </div>
      </div>

      <div className="bg-white mt-4 px-6 py-8  rounded border-2 border-slate-900 text-black w-full">
        <h1 className="mb-8 text-lg text-center">
          How would you rate <br />{" "}
          <div className="font-bold font-lg">{restaurantName}</div>
        </h1>

        <input
          type="text"
          className="block border border-grey-light w-full p-3  mb-4"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formdata["username"]}
        />

        <textarea
          name="feedback"
          onChange={handleChange}
          value={formdata["feedback"]}
          placeholder="Feedback message"
          className="h-40 p-2 w-full border rounded"
        ></textarea>

        <List strongIos dividersIos>
          {order?.items &&
            order.items.map((item, index) => (
              <div key={index}>
                <ListItem
                  chevronMaterial={false}
                  title={<div className="font-xs">{item.itemName}</div>}
                  text={
                    <div>
                      <Rate
                        rating={
                          ratings.find((r) => r.id === item._id)?.rating ?? 0
                        }
                        onRating={(rate) => handleRating(index, rate, item._id)}
                      />
                    </div>
                  }
                  media={
                    <img
                      className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                      src={item?.image}
                      width="80"
                      alt="aaa"
                    />
                  }
                ></ListItem>
              </div>
            ))}
        </List>

        <div
          className="bg-slate-900 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center "
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </Block>
  );
}

export default Notification;
