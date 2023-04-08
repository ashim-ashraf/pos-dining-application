import { useEffect, useState } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function Details() {
  const { userData, setUserData } = useStepperContext();
  

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setUserData({
      ...userData,
      workingDays: {
        ...userData.workingDays,
        [name]: checked,
      },
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData)
  };

  
  const [openingTime, setOpeningTime] = useState({
    hour: "01",
    minute: "00",
    meridian: "AM",
  });

  const [closingTime, setClosingTime] = useState({
    hour: "01",
    minute: "00",
    meridian: "AM",
  });

  function handleOpeningTimeChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setOpeningTime({ ...openingTime, [name]: value });
  }

  function handleClosingTimeChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setClosingTime({ ...closingTime, [name]: value });
    console.log(name,value,"aaaaa")
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Convert opening and closing time to 24 hours format
    const openingTime24 = convertTo24Hours(openingTime.hour, openingTime.minute, openingTime.meridian);
    const closingTime24 = convertTo24Hours(closingTime.hour, closingTime.minute, closingTime.meridian);

    // Store the opening and closing time in user data
    const updatedUserData = { ...userData, openingTime: openingTime24, closingTime: closingTime24 };
    setUserData(updatedUserData);
  }

  function convertTo24Hours(hour, minute, meridian) {
    let hour24 = parseInt(hour);
    if (meridian === "PM" && hour !== "12") {
      hour24 += 12;
    } else if (meridian === "AM" && hour === "12") {
      hour24 = 0;
    }
    const minute24 = parseInt(minute);
    return { hour: hour24, minute: minute24 };
  }

  


  return (
    <div className="flex flex-col ">
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
            value={userData["restaurantType"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <form>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="working-days"
            >
              Working Days
            </label>
            <div className="flex flex-row ">
              <div className="mr-2">
                <input
                  type="checkbox"
                  id="monday"
                  name="monday"
                  checked={userData.workingDays.monday}
                  onChange={handleCheckboxChange}
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
                  checked={userData.workingDays.tuesday}
                  onChange={handleCheckboxChange}
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
                  checked={userData.workingDays.wednesday}
                  onChange={handleCheckboxChange}
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
                  checked={userData.workingDays.thursday}
                  onChange={handleCheckboxChange}
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
                  checked={userData.workingDays.friday}
                  onChange={handleCheckboxChange}
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
                  checked={userData.workingDays.saturday}
                  onChange={handleCheckboxChange}
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
                  checked={userData.workingDays.sunday}
                  onChange={handleCheckboxChange}
                  defaultValue="sunday"
                  className="form-checkbox"
                />
                <label htmlFor="sunday">Sunday</label>
              </div>
            </div>
          </form>
        </div>

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 pt-10">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="working-days"
          >
            Opening Time
          </label>

          <div class="inline-flex text-lg border rounded-md shadow-lg p-2 first-letter:">
            <select
              name="hour"
              id=""
              value={ openingTime.hour}
              onChange={handleSubmit}
              onInput={handleOpeningTimeChange}
              onc
              class="px-2 outline-none appearance-none bg-transparent"
            >
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <span class="px-2">:</span>
            <select
              name="minute"
              id=""
              value={openingTime.minute}  onChange={handleSubmit}
              onInput={handleOpeningTimeChange}
              class="px-2 outline-none appearance-none bg-transparent"
            >
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select
              name="meridian"
              id=""
              value={openingTime.meridian}  onChange={handleSubmit}
              onInput={handleOpeningTimeChange}
              class="px-2 outline-none appearance-none bg-transparent"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 pt-10">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="working-days"
          >
            Closing Time
          </label>

          <div class="inline-flex text-lg border rounded-md shadow-lg p-2 first-letter:">
            <select
              name="hour"
              id=""
              value={closingTime.hour}onChange={handleSubmit}
              onInput={handleClosingTimeChange}
              class="px-2 outline-none appearance-none bg-transparent"
            >
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <span class="px-2">:</span>
            <select
              name="minute"
              id=""
              value={closingTime.minute} onChange={handleSubmit}
              onInput={handleClosingTimeChange}
              class="px-2 outline-none appearance-none bg-transparent"
            >
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select
              name="meridian"
              id=""
              value={closingTime.meridian} onChange={handleSubmit}
              onInput={handleClosingTimeChange}
              class="px-2 outline-none appearance-none bg-transparent"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
