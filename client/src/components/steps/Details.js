import { useStepperContext } from "../../contexts/StepperContext";

export default function Details() {
  const { userData, setUserData } = useStepperContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div>
  <form className="w-full ">

  <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Restaurant Type
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="restaurantType"
            onChange={handleChange}
            value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />
          {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
        
      </div>
    <div className="flex flex-col space-y-4">
      <h1 className="text-lg font-medium">Shop Timings</h1>
      <div className="w-full max-w-xs">
  <form>
    <div className="flex flex-col mb-4">
      <label className="font-bold mb-2" htmlFor="working-days">
        Working Days:
      </label>
      <div className="flex flex-row">
        <div className="mr-2">
          <input
            type="checkbox"
            id="monday"
            name="monday"
            defaultValue="monday"
            className="form-checkbox"
          />
          <label htmlFor="monday">Monday</label>
        </div>
        <div className="mr-2">
          <input
            type="checkbox"
            id="tuesday"
            name="tuesday"
            defaultValue="tuesday"
            className="form-checkbox"
          />
          <label htmlFor="tuesday">Tuesday</label>
        </div>
        <div className="mr-2">
          <input
            type="checkbox"
            id="wednesday"
            name="wednesday"
            defaultValue="wednesday"
            className="form-checkbox"
          />
          <label htmlFor="wednesday">Wednesday</label>
        </div>
        <div className="mr-2">
          <input
            type="checkbox"
            id="thursday"
            name="thursday"
            defaultValue="thursday"
            className="form-checkbox"
          />
          <label htmlFor="thursday">Thursday</label>
        </div>
        <div className="mr-2">
          <input
            type="checkbox"
            id="friday"
            name="friday"
            defaultValue="friday"
            className="form-checkbox"
          />
          <label htmlFor="friday">Friday</label>
        </div>
        <div className="mr-2">
          <input
            type="checkbox"
            id="saturday"
            name="saturday"
            defaultValue="saturday"
            className="form-checkbox"
          />
          <label htmlFor="saturday">Saturday</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="sunday"
            name="sunday"
            defaultValue="sunday"
            className="form-checkbox"
          />
          <label htmlFor="sunday">Sunday</label>
        </div>
      </div>
    </div>
    
  </form>
</div>

      <div className="flex flex-row items-center justify-center">
  <div className="w-1/2 p-4">
    <label
      className="block mb-2 font-bold text-gray-700"
      htmlFor="opening-time"
    >
      Opening Time
    </label>
    <select
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="opening-time"
      name="opening-time"
    >
      <option value={0}>12:00 AM</option>
      <option value={1}>1:00 AM</option>
      <option value={2}>2:00 AM</option>
      {/* and so on... */}
      <option value={23}>11:00 PM</option>
    </select>
  </div>
  <div className="w-1/2 p-4">
    <label
      className="block mb-2 font-bold text-gray-700"
      htmlFor="closing-time"
    >
      Closing Time
    </label>
    <select
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="closing-time"
      name="closingTime"
    >
      <option value={0}>12:00 AM</option>
      <option value={1}>1:00 AM</option>
      <option value={2}>2:00 AM</option>
      {/* and so on... */}
      <option value={23}>11:00 PM</option>
    </select>
  </div>
</div>


    </div>
  </form>
</div>

   
  );
}
