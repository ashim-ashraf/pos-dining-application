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
            value={userData["restaurantType"] || ""}
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
      <div
  class="relative mb-3 xl:w-96"
  id="timepicker-inline-12"
  data-te-input-wrapper-init>
  <input
    type="text"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="form2" />
  <label
    for="form2"
    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
    >Select a time</label
  >
</div>
<div
  class="relative mb-3 xl:w-96"
  id="timepicker-inline-12"
  data-te-input-wrapper-init>
  <input
    type="text"
    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
    id="form2" />
  <label
    for="form2"
    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
    >Select a time</label
  >
</div>
</div>


    </div>
  </form>
</div>

   
  );
}
