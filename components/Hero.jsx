"use client";
import { SearchIcon } from "@/public/data/icons";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFieldArray, useForm } from "react-hook-form";
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useRouter } from 'next/navigation'
import RadioButton from "./RadioButton";
import SearchableSelectInput from "./SearchableSelectInput";
import SearchableAirlineSelectInput from "./SearchableAirlineSelectInput";
import SearchableCountrySelectInput from "./SearchableCountrySelectInput";
import currencies from "@/utils/currencies";
import {
  getAirlinesRequest
} from "@/components/redux/slice/airlines";
import useLogout from "./hooks/useLogout";

const schema = yup
  .object()
  .shape({
    // touchPoint: yup.string().required("Touch point is required."),
    // reviewTypeId: yup.string().required("Review type is required."),
    // title: yup.string().required("Feedback title is required."),
  })
  .required();

const flightClass = [
  { id: "Y", name: "First" },
  { id: "X", name: "Business" },
  { id: "Z", name: "Economy" },
];


const Hero = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    airlines,
    isFetchingAirlines,
    fetchAirlinesError,
  } = useSelector((state) => state.airlineData);

  const { isLogingIn, loginSuccessMessage } =
    useSelector((state) => state.authData);

  const logout = useLogout();

  const [airlineData, setAirlineData] = useState([]);
  

  let prev = new Date();
  prev.setDate(prev.getDate());
  let date1 = prev.toISOString().substring(0, 10);

  useEffect(() => {
    setValue("FlightSearchType", "Oneway");
    // setValue("DepartureDate", date1);
    document.getElementById("DepartureDate").min = new Date()
      .toISOString()
      .split("T")[0];
  }, []);

  useEffect(() => {
    if(window.sessionStorage.getItem('airlines') && window.sessionStorage.getItem('airlines') !== undefined && window.sessionStorage.getItem('airlines') !== "undefined") {
      // console.log("Called from sessionStorage============================")
      setAirlineData(JSON.parse(window.sessionStorage.getItem('airlines')))
    } else {
      // console.log("Called from Redux============================")
      dispatch(
        getAirlinesRequest()
      );
    }
    return;
  }, []);

  useEffect(() => {

    if(!window.sessionStorage.getItem('airlines') || window.sessionStorage.getItem('airlines') === '' || window.sessionStorage.getItem('airlines') === null || window.sessionStorage.getItem('airlines') === "null" || window.sessionStorage.getItem('airlines') === undefined || window.sessionStorage.getItem('airlines') === "undefined") {
    // console.log("Data from Redux============================")
    if (
      !isLogingIn &&
      !isFetchingAirlines &&
      (fetchAirlinesError?.Status === 401 ||
        fetchAirlinesError?.Status === 403 ||
        fetchAirlinesError?.Status === 500)
    ) {
      // logout();
      return;
    } else {
      // console.log("Airline Hero=====================, ", airlines)
      setAirlineData(airlines?.data);

      window.sessionStorage.setItem('airlines', JSON.stringify(airlines?.data))
    
      
      return;
    }
  }
  }, [airlines]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Itineraries: [
        {
          Departure: "LOS",
          Destination: "YYZ",
          DepartureDate: "11/15/2023",
        },
      ],
    },
    // resolver: yupResolver(schema),
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: "Itineraries",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const submit = async (data) => {
    let Itineraries = []
    await data.Itineraries.map((item, index) => {
       Itineraries.push({"Departure": item.Departure,
      "Destination": item.Destination,
      "DepartureDate": item.DepartureDate.toISOString().substring(0, 10).split('-')[1]+ "/" + item.DepartureDate.toISOString().substring(0, 10).split('-')[2] + "/" + item.DepartureDate.toISOString().substring(0, 10).split('-')[0]})
    })

    const newData = {...data, Itineraries:Itineraries}

    // console.log("new data============================, ", newData)

    router.push(`/flight-list?searchdata=${JSON.stringify(newData)}`)
  };

  // useEffect(() => {
  //   console.log(watch("FlightSearchType"));
  // }, [watch().FlightSearchType]);

  return (
    <section className="bg-[url('/img/herobg3.gif')] bg-cover bg-no-repeat relative isolate bg-[50%] top-0 min-h-screen after:w-full after:absolute after:h-full after:bottom-0 after:left-0 after:bg-gradient-to-t  after:from-[#04052f5b] after:to-[#04052f5b]">
      <div className="container relative py-[120px] md:pt-[180px] md:pb-[40px] lg:py-[120px]  lg:pb-[60px]   xl:after:w-full xl:after:h-full after:bg-right after:bottom-0 xxl:after:-right-40  z-10">
        <div className="grid grid-cols-12 gap-5 z-10  -mt-14 lg:mt-0 px-4 sm:px-0">
          <div className="col-span-12 lg:col-span-8 xl:col-span-6 xxl:col-span-5 text-white">
            <h1 className="h1 mt-4 mb-6 font-semibold ">
              Book Your Next Flight with Ease
            </h1>
            <p className="mb-10 text-lg">
              Ready to explore the world? Our flight booking website makes it
              easy to unlock new destinations and experiences.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)}>
          <div className="bg-[#f2f2f2] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 rounded-xl p-6 md:p-6 md:pb-2 z-10 mx-4 sm:mx-0 lg:mt-4 shadow-2xl">
            <div className="flex flex-col xxl:flex-row lg:justify-between items-center gap-8 xxl:gap-0">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 text-lg">
                <RadioButton
                  name={"FlightSearchType"}
                  register={register}
                  label={"Oneway"}
                  id={"Oneway"}
                  checked={true}
                />
                <RadioButton
                  name={"FlightSearchType"}
                  register={register}
                  label={"Return"}
                  id={"Return"}
                />

                <RadioButton
                  name={"FlightSearchType"}
                  register={register}
                  label={"Multiple destinations"}
                  id={"Multiple destinations"}
                />
              </div>
              {/* {errors?.isParent && (
              <span className=" text-red-500 text-sm ml-2">
                {errors?.isParent.message}
              </span>
            )} */}

              <div className="flex flex-col gap-5 mb-6 lg:mt-3 lg:mb-4 lg:flex-row xxl:w-[66%] w-full md:gap-5 items-center justify-between">
                <div className="flex flex-col gap-5  md:flex-row xxl:w-[48%] w-full md:gap-5 ">
                <div className="relative w-full md:w-[48%] shrink-0 z-20">
                  <select
                    name="Ticketclass"
                    id="Ticketclass"
                    className={` outline-none w-full h-full py-2 px-3 rounded-full shadow-lg`}
                    placeholder=" "
                    {...register("Ticketclass")}
                  >
                    <option value="">Select class...</option>
                    {flightClass?.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* {isError && (
        <span className=" text-red-500 text-sm ml-2">{errorMessage}</span>
      )} */}

              <div className="relative w-full md:w-[48%] shrink-0">
                  <SearchableCountrySelectInput
                    items={currencies}
                    // label="Select Review Type"
                    type="text"
                    firstOptionLabel="Select a currency."
                    name={`TargetCurrency`}
                    id={`TargetCurrency`}
                    isError={errors?.TargetCurrency}
                    register={register}
                    errorMessage={errors.TargetCurrency?.message}
                    setValue={setValue}
                    watch={watch}
                    icon="GrCurrency"
                    boxRef="TargetCurrency"
                    inputRef="TargetCurrencyInput"
                    placeholder="Currency"
                  />
                </div>
                </div>
                

                <div className="relative flex flex-col sm:flex-row  items-center justify-center gap-4 sm:gap-5 text-left w-full md:w-[68%] lg:w-[48%] xxl:w-[54%] shrink-0 px-4 mt-4 md:mt-0">
                  <div className=" w-[80%] sm:w-[30%] flex flex-row items-center justify-between sm:justify-center sm:gap-2">
                    <label
                      htmlFor="Adults"
                      className={`text-[16px] flex flex-col items-center`}
                    >
                      <span className="!text-left">Adults</span>
                      {/* <span className="text-[11px] -mt-1">
                      (Ages 18 or above)
                    </span> */}
                    </label>
                    <input
                      type="number"
                      id="Adults"
                      name="Adults"
                      className={` w-[55%] sm:w-[85%] rounded-lg outline-none bg-white flex items-center  justify-center text-center text-xl py-1 shadow-lg`}
                      placeholder=" "
                      min={0}
                      defaultValue={0}
                      {...register("Adults")}
                    />
                  </div>

                  <div className=" w-[80%] sm:w-[34%] flex flex-row items-center justify-between sm:justify-center sm:gap-2">
                    <label
                      htmlFor="Children"
                      className={`text-[16px] flex flex-col items-center`}
                    >
                      <span className="!text-left">Children</span>
                      {/* <span className="text-[11px] -mt-1">
                      (Ages 2 to 17)
                    </span> */}
                    </label>
                    <input
                      type="number"
                      id="Children"
                      name="Children"
                      className={`w-[55%] sm:w-[75%] rounded-lg outline-none bg-white flex items-center  justify-center text-center text-xl py-1 shadow-lg`}
                      placeholder=" "
                      min={0}
                      defaultValue={0}
                      {...register("Children")}
                    />
                  </div>

                  <div className=" w-[80%] sm:w-[30%] flex flex-row items-center justify-between sm:justify-center sm:gap-2">
                    <label
                      htmlFor="Infants"
                      className={`text-[16px] flex flex-col  items-center`}
                    >
                      <span className="!text-left">Infants</span>
                      {/* <span className="text-[11px] -mt-1">
                      (Ages 0 to 1)
                    </span> */}
                    </label>
                    <input
                      type="number"
                      id="Infants"
                      name="Infants"
                      className={` w-[55%] sm:w-[85%] rounded-lg outline-none bg-white flex items-center  justify-center text-center text-xl py-1 shadow-lg`}
                      placeholder=" "
                      min={0}
                      defaultValue={0}
                      {...register("Infants")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {watch("FlightSearchType") === "Multiple destinations" ? (
              fields.map((field, index) => {
                return (
                  <div key={field.id} className="flex flex-wrap gap-5 mt-6">
                    {/* <LocationEntry placeholder="From" /> */}
                    <div className="relative w-full md:w-[48%] xxl:w-[27%] shrink-0">
                      <SearchableAirlineSelectInput
                        items={airlineData}
                        // label="Select Review Type"
                        type="text"
                        firstOptionLabel="Select a departure location"
                        name={`Itineraries.${index}.Departure`}
                        id={`Itineraries.${index}.Departure`}
                        isError={errors?.Departure}
                        register={register}
                        errorMessage={errors.Departure?.message}
                        setValue={setValue}
                        watch={watch}
                        icon="GrLocation"
                        boxRef={`Itineraries.${index}.Departure`}
                        inputRef={`Itineraries.${index}.DepartureInput`}
                        placeholder="Departure"
                      />
                    </div>

                    <div className="relative w-full md:w-[48%] xxl:w-[27%] shrink-0">
                      <SearchableAirlineSelectInput
                        items={airlineData}
                        // label="Select Review Type"
                        type="text"
                        firstOptionLabel="Select a destination location"
                        name={`Itineraries.${index}.Destination`}
                        id={`Itineraries.${index}.Destination`}
                        isError={errors?.Destination}
                        register={register}
                        errorMessage={errors.Destination?.message}
                        setValue={setValue}
                        watch={watch}
                        icon="GrLocation"
                        boxRef={`Itineraries.${index}.Destination`}
                        inputRef={`Itineraries.${index}.DestinationInput`}
                        placeholder="Destination"
                      />
                    </div>

                    {/* <LocationEntry placeholder="To" /> */}
                    <div className="w-full relative md:w-[48%] xxl:w-[27%] flex pl-2 pr-3 items-center justify-between rounded-full sm:text-sm bg-white shadow-lg">
                      <input
                        type="date"
                        id="DepartureDate"
                        mame="DepartureDate"
                        className={` flex-1 rounded-full outline-none bg-white flex items-center  justify-center text-lg py-2 pl-1 `}
                        placeholder="Select Date..."
                        min={0}
                        defaultValue=""
                        // onFocus={(e) => (e.target.type = "date")}
                        // onBlur={(e) => (e.target.type = "text")}
                        {...register(`Itineraries.${index}.DepartureDate`, {
                          valueAsDate: true,
                        })}
                      />
                      {/* <CalendarDaysIcon className="absolute right-[13px] top-3 w-5 h-5 text-gray-600 shrink-0" /> */}
                    </div>

                    {/* <Link
              href="/flight-list"
              className="py-[14px] px-6 w-full flex justify-center md:w-auto text-white bg-primary rounded-full"
            >
              <SearchIcon />
            </Link> */}

                    <div className="w-full md:w-[48%] xxl:w-[14%] flex pl-2 pr-3 items-center justify-end gap-20 md:justify-end ">
                      <div
                        onClick={() => {
                          remove(index);
                        }}
                        className="p-2 h-[35px] bg-[rgba(255,255,255,.8)]  shadow-lg rounded-lg  flex justify-center items-center gap-2 text-red-500"
                      >
                        <MdOutlineDeleteOutline className=" text-2xl text-red-500 font-black" />
                        Remove
                      </div>
                    </div>
                  </div>
                );
              })
            ) : watch("FlightSearchType") === "Return" ? (
              <>
                <div className="flex flex-wrap gap-5 mt-6">
                  {/* <LocationEntry placeholder="From" /> */}
                  <div className="relative w-full md:w-[48%] xxl:w-[32%] shrink-0">
                    <SearchableAirlineSelectInput
                      items={airlineData}
                      // label="Select Review Type"
                      type="text"
                      firstOptionLabel="Select a departure location"
                      name={`Itineraries.${0}.Departure`}
                      id={`Itineraries.${0}.Departure`}
                      isError={errors?.Departure}
                      register={register}
                      errorMessage={errors.Departure?.message}
                      setValue={setValue}
                      watch={watch}
                      icon="GrLocation"
                      boxRef={`Itineraries.${0}.Departure`}
                      inputRef={`Itineraries.${0}.DepartureInput`}
                      placeholder="Departure"
                    />
                  </div>

                  <div className="relative w-full md:w-[48%] xxl:w-[32%] shrink-0">
                    <SearchableAirlineSelectInput
                      items={airlineData}
                      // label="Select Review Type"
                      type="text"
                      firstOptionLabel="Select a destination location"
                      name={`Itineraries.${0}.Destination`}
                      id={`Itineraries.${0}.Destination`}
                      isError={errors?.Destination}
                      register={register}
                      errorMessage={errors.Destination?.message}
                      setValue={setValue}
                      watch={watch}
                      icon="GrLocation"
                      boxRef={`Itineraries.${0}.Destination`}
                      inputRef={`Itineraries.${0}.DestinationInput`}
                      placeholder="Destination"
                    />
                  </div>

                  {/* <LocationEntry placeholder="To" /> */}
                  <div className="w-full relative md:w-[48%] xxl:w-[32%] flex pl-2 pr-3 items-center justify-between rounded-full sm:text-sm bg-white shadow-lg">
                    <input
                      type="date"
                      id="DepartureDate"
                      name="DepartureDate"
                      className={` flex-1 rounded-full outline-none bg-white flex items-center  justify-center text-lg py-2 pl-1 `}
                      placeholder="Select Date..."
                      min={0}
                      defaultValue=""
                      // onFocus={(e) => (e.target.type = "date")}
                      // onBlur={(e) => (e.target.type = "text")}
                      {...register(`Itineraries.${0}.DepartureDate`, {
                        valueAsDate: true,
                      })}
                    />
                    {/* <CalendarDaysIcon className="absolute right-[13px] top-3 w-5 h-5 text-gray-600 shrink-0" /> */}
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 mt-6">
                  {/* <LocationEntry placeholder="From" /> */}
                  <div className="relative w-full md:w-[48%] xxl:w-[32%] shrink-0">
                    <SearchableAirlineSelectInput
                      items={airlineData}
                      // label="Select Review Type"
                      type="text"
                      firstOptionLabel="Select a departure location"
                      name={`Itineraries.${1}.Departure`}
                      id={`Itineraries.${1}.Departure`}
                      isError={errors?.Departure}
                      register={register}
                      errorMessage={errors.Departure?.message}
                      setValue={setValue}
                      watch={watch}
                      icon="GrLocation"
                      boxRef={`Itineraries.${1}.Departure`}
                      inputRef={`Itineraries.${1}.DepartureInput`}
                      placeholder="Departure"
                    />
                  </div>

                  <div className="relative w-full md:w-[48%] xxl:w-[32%] shrink-0">
                    <SearchableAirlineSelectInput
                      items={airlineData}
                      // label="Select Review Type"
                      type="text"
                      firstOptionLabel="Select a destination location"
                      name={`Itineraries.${1}.Destination`}
                      id={`Itineraries.${1}.Destination`}
                      isError={errors?.Destination}
                      register={register}
                      errorMessage={errors.Destination?.message}
                      setValue={setValue}
                      watch={watch}
                      icon="GrLocation"
                      boxRef={`Itineraries.${1}.Destination`}
                      inputRef={`Itineraries.${1}.DestinationInput`}
                      placeholder="Destination"
                    />
                  </div>

                  {/* <LocationEntry placeholder="To" /> */}
                  <div className="w-full relative md:w-[48%] xxl:w-[32%] flex pl-2 pr-3 items-center justify-between rounded-full sm:text-sm bg-white shadow-lg">
                    <input
                      type="date"
                      id="DepartureDate"
                      name="DepartureDate"
                      className={` flex-1 rounded-full outline-none bg-white flex items-center  justify-center text-lg py-2 pl-1 `}
                      placeholder="Select Date..."
                      min={0}
                      defaultValue=""
                      // onFocus={(e) => (e.target.type = "date")}
                      // onBlur={(e) => (e.target.type = "text")}
                      {...register(`Itineraries.${1}.DepartureDate`, {
                        valueAsDate: true,
                      })}
                    />
                    {/* <CalendarDaysIcon className="absolute right-[13px] top-3 w-5 h-5 text-gray-600 shrink-0" /> */}
                  </div>
                </div>
              </>
            ) : (
              


              <div className="flex flex-wrap gap-5 mt-6">
                {/* <LocationEntry placeholder="From" /> */}
                <div className="relative w-full md:w-[48%] xxl:w-[32%] shrink-0">
                  <SearchableAirlineSelectInput
                    items={airlineData}
                    // label="Select Review Type"
                    type="text"
                    firstOptionLabel="Select a departure location"
                    name={`Itineraries.${0}.Departure`}
                    id={`Itineraries.${0}.Departure`}
                    isError={errors?.Departure}
                    register={register}
                    errorMessage={errors.Departure?.message}
                    setValue={setValue}
                    watch={watch}
                    icon="GrLocation"
                    boxRef={`Itineraries.${0}.Departure`}
                    inputRef={`Itineraries.${0}.DepartureInput`}
                    placeholder="Departure"
                  />
                </div>

                <div className="relative w-full md:w-[48%] xxl:w-[32%] shrink-0">
                  <SearchableAirlineSelectInput
                    items={airlineData}
                    // label="Select Review Type"
                    type="text"
                    firstOptionLabel="Select a destination location"
                    name={`Itineraries.${0}.Destination`}
                    id={`Itineraries.${0}.Destination`}
                    isError={errors?.Destination}
                    register={register}
                    errorMessage={errors.Destination?.message}
                    setValue={setValue}
                    watch={watch}
                    icon="GrLocation"
                    boxRef={`Itineraries.${0}.Destination`}
                    inputRef={`Itineraries.${0}.DestinationInput`}
                    placeholder="Destination"
                  />
                </div>

                {/* <LocationEntry placeholder="To" /> */}
                <div className="w-full relative md:w-[48%] xxl:w-[32%] flex pl-2 pr-3 items-center justify-between rounded-full sm:text-sm bg-white shadow-lg">
                  <input
                    type="date"
                    id="DepartureDate"
                    name="DepartureDate"
                    className={` flex-1 rounded-full outline-none bg-white flex items-center  justify-center text-lg py-2 pl-1 `}
                    placeholder="Select Date..."
                    min={0}
                    defaultValue=""
                    // onFocus={(e) => (e.target.type = "date")}
                    // onBlur={(e) => (e.target.type = "text")}
                    {...register(`Itineraries.${0}.DepartureDate`, {
                      valueAsDate: true,
                    })}
                  />
                  {/* <CalendarDaysIcon className="absolute right-[13px] top-3 w-5 h-5 text-gray-600 shrink-0" /> */}
                </div>
              </div>
            )}

            {errors?.Itineraries?.root && (
              <span className=" text-red-500 text-sm ml-2">
                {errors?.Itineraries?.root?.message}
              </span>
            )}

              {watch().FlightSearchType === "Multiple destinations" && (
                <div className="w-full md:fixed bottom-16 right-6 flex justify-end items-center mt-6 pr-4">
                <div
                  onClick={() => {
                    append();
                  }}
                  className="p-2 px-3 h-[35px] bg-[rgba(255,255,255,.8)]  shadow-xl rounded-lg  flex justify-center items-center gap-2 text-green-500"
                >
                  <MdAdd className=" text-2xl text-green-500 font-black" />
                  Add
                </div>
              </div>
              )}
            

            <div className="w-full flex justify-center md:justify-start items-center md:pr-4 ">
              <div className=" w-full md:w-[30%]  mt-14 mb-4 h-full">
                <button
                  // href="/flight-list"
                  type="submit"
                  className="h-[44px]  w-full flex items-center justify-center md:w-full text-white bg-primary rounded-full"
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
