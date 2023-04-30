import axios from "axios";
import { Block, Button } from "konsta/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Notification() {
  const [visible, setVisible] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const order = useSelector((state) => state.user.order);

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

  return (
    // <div className="flex-col">
    //   <div className="flex">
    //     <div
    //       className={`fixed   w-full ${
    //         visible
    //           ? "h-screen flex justify-center items-center"
    //           : "h-32 flex justify-center items-center"
    //       } transition-all duration-1000 ease-in-out bg-green-200 overflow-hidden `}
    //     >
    //       <div className="w-3/4 h-3/4 bg-white rounded-lg p-8 bg-green-700">
    //         <h1 className="text-2xl text-white font-bold mb-4 ">
    //           Payment Successfull
    //         </h1>

    //         <div>
    //           <img
    //             className="mt-8"
    //             src="https://cajobs.icai.org/images/new_home/success.gif"
    //             alt=""
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       Lorem ipsum dolor sit amet consectetur adipiscing elit, magnis integer
    //       tempor vel dui feugiat cras montes, venenatis in taciti maecenas
    //       turpis volutpat. Mauris ultrices sem donec mollis dapibus pharetra
    //       elementum, interdum lectus libero augue eros felis vitae suscipit,
    //       erat volutpat magnis sed vivamus habitant. Torquent faucibus eros in
    //       urna nibh montes mi justo at platea, luctus posuere nam ridiculus
    //       pulvinar nisi praesent quisque lacinia purus, semper ultrices velit
    //       magnis mus ultricies senectus ullamcorper facilisis. Morbi augue
    //       malesuada facilisis litora posuere ultricies est pellentesque massa
    //       vivamus, dignissim lobortis rhoncus class tempor dui nunc turpis vitae
    //       dictum, nam purus auctor eu integer leo felis semper sociosqu.
    //       Himenaeos sapien enim donec nulla faucibus massa inceptos eros,
    //       aliquam luctus non sagittis malesuada ullamcorper purus cubilia risus,
    //       curabitur per convallis parturient vel montes sociosqu. Placerat
    //       mollis auctor ultricies venenatis aenean pharetra tellus rutrum nisi
    //       fusce, mi orci inceptos gravida mattis aliquam habitant convallis
    //       suscipit senectus, interdum rhoncus laoreet ornare cum litora
    //       fermentum nam dictumst.Lorem ipsum dolor sit amet consectetur adipiscing elit, magnis integer
    //       tempor vel dui feugiat cras montes, venenatis in taciti maecenas
    //       turpis volutpat. Mauris ultrices sem donec mollis dapibus pharetra
    //       elementum, interdum lectus libero augue eros felis vitae suscipit,
    //       erat volutpat magnis sed vivamus habitant. Torquent faucibus eros in
    //       urna nibh montes mi justo at platea, luctus posuere nam ridiculus
    //       pulvinar nisi praesent quisque lacinia purus, semper ultrices velit
    //       magnis mus ultricies senectus ullamcorper facilisis. Morbi augue
    //       malesuada facilisis litora posuere ultricies est pellentesque massa
    //       vivamus, dignissim lobortis rhoncus class tempor dui nunc turpis vitae
    //       dictum, nam purus auctor eu integer leo felis semper sociosqu.
    //       Himenaeos sapien enim donec nulla faucibus massa inceptos eros,
    //       aliquam luctus non sagittis malesuada ullamcorper purus cubilia risus,
    //       curabitur per convallis parturient vel montes sociosqu. Placerat
    //       mollis auctor ultricies venenatis aenean pharetra tellus rutrum nisi
    //       fusce, mi orci inceptos gravida mattis aliquam habitant convallis
    //       suscipit senectus, interdum rhoncus laoreet ornare cum litora
    //       fermentum nam dictumst.Lorem ipsum dolor sit amet consectetur adipiscing elit, magnis integer
    //       tempor vel dui feugiat cras montes, venenatis in taciti maecenas
    //       turpis volutpat. Mauris ultrices sem donec mollis dapibus pharetra
    //       elementum, interdum lectus libero augue eros felis vitae suscipit,
    //       erat volutpat magnis sed vivamus habitant. Torquent faucibus eros in
    //       urna nibh montes mi justo at platea, luctus posuere nam ridiculus
    //       pulvinar nisi praesent quisque lacinia purus, semper ultrices velit
    //       magnis mus ultricies senectus ullamcorper facilisis. Morbi augue
    //       malesuada facilisis litora posuere ultricies est pellentesque massa
    //       vivamus, dignissim lobortis rhoncus class tempor dui nunc turpis vitae
    //       dictum, nam purus auctor eu integer leo felis semper sociosqu.
    //       Himenaeos sapien enim donec nulla faucibus massa inceptos eros,
    //       aliquam luctus non sagittis malesuada ullamcorper purus cubilia risus,
    //       curabitur per convallis parturient vel montes sociosqu. Placerat
    //       mollis auctor ultricies venenatis aenean pharetra tellus rutrum nisi
    //       fusce, mi orci inceptos gravida mattis aliquam habitant convallis
    //       suscipit senectus, interdum rhoncus laoreet ornare cum litora
    //       fermentum nam dictumst.Lorem ipsum dolor sit amet consectetur adipiscing elit, magnis integer
    //       tempor vel dui feugiat cras montes, venenatis in taciti maecenas
    //       turpis volutpat. Mauris ultrices sem donec mollis dapibus pharetra
    //       elementum, interdum lectus libero augue eros felis vitae suscipit,
    //       erat volutpat magnis sed vivamus habitant. Torquent faucibus eros in
    //       urna nibh montes mi justo at platea, luctus posuere nam ridiculus
    //       pulvinar nisi praesent quisque lacinia purus, semper ultrices velit
    //       magnis mus ultricies senectus ullamcorper facilisis. Morbi augue
    //       malesuada facilisis litora posuere ultricies est pellentesque massa
    //       vivamus, dignissim lobortis rhoncus class tempor dui nunc turpis vitae
    //       dictum, nam purus auctor eu integer leo felis semper sociosqu.
    //       Himenaeos sapien enim donec nulla faucibus massa inceptos eros,
    //       aliquam luctus non sagittis malesuada ullamcorper purus cubilia risus,
    //       curabitur per convallis parturient vel montes sociosqu. Placerat
    //       mollis auctor ultricies venenatis aenean pharetra tellus rutrum nisi
    //       fusce, mi orci inceptos gravida mattis aliquam habitant convallis
    //       suscipit senectus, interdum rhoncus laoreet ornare cum litora
    //       fermentum nam dictumst.Lorem ipsum dolor sit amet consectetur adipiscing elit, magnis integer
    //       tempor vel dui feugiat cras montes, venenatis in taciti maecenas
    //       turpis volutpat. Mauris ultrices sem donec mollis dapibus pharetra
    //       elementum, interdum lectus libero augue eros felis vitae suscipit,
    //       erat volutpat magnis sed vivamus habitant. Torquent faucibus eros in
    //       urna nibh montes mi justo at platea, luctus posuere nam ridiculus
    //       pulvinar nisi praesent quisque lacinia purus, semper ultrices velit
    //       magnis mus ultricies senectus ullamcorper facilisis. Morbi augue
    //       malesuada facilisis litora posuere ultricies est pellentesque massa
    //       vivamus, dignissim lobortis rhoncus class tempor dui nunc turpis vitae
    //       dictum, nam purus auctor eu integer leo felis semper sociosqu.
    //       Himenaeos sapien enim donec nulla faucibus massa inceptos eros,
    //       aliquam luctus non sagittis malesuada ullamcorper purus cubilia risus,
    //       curabitur per convallis parturient vel montes sociosqu. Placerat
    //       mollis auctor ultricies venenatis aenean pharetra tellus rutrum nisi
    //       fusce, mi orci inceptos gravida mattis aliquam habitant convallis
    //       suscipit senectus, interdum rhoncus laoreet ornare cum litora
    //       fermentum nam dictumst.
    //     </div>
    //   </div>
    // </div>
    <Block>
      <div className="mt-12 items-center justify-center ">
        <div class="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            class="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p class="text-gray-600 my-2">Thank you for dining with us.</p>
            <p> Have a great day! </p>
          </div>
        </div>
      </div>

      <div className="bg-white mt-12 px-6 py-8 rounded border-2 border-slate-900 text-black w-full">
        <h1 className="mb-8 text-lg text-center">
          How was your shopping from{" "}
        </h1>

        <div class="ml-14 flex items-center">
          <svg
            aria-hidden="true"
            class="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            class="w-10 h-10 text-gray-300 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>

        <input
          type="text"
          className="block border border-grey-light w-full p-3  mb-4"
          name="Name"
          placeholder="Username"
          // value={username}
          // onChange={(e) => {
          //   setUsername(e.target.value);
          // }}
        />

        <input
          type="password"
          className="block border border-grey-light w-full p-3  mb-4"
          name="password"
          placeholder="Feedback"
          // value={password}
          // onChange={(e) => {
          //   setPassword(e.target.value);
          // }}
        />

        <div
          className="bg-slate-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center "
          // onClick={onSubmit}
        >
          Submit
        </div>
      </div>
    </Block>
  );
}

export default Notification;
