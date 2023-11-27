/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import DynamicIcons from "./DynamicIcons";

const SearchableSelectInput = ({
  items,
  name,
  setValue,
  register,
  label,
  firstOptionLabel,
  type,
  id,
  isError,
  errorMessage,
  inputRef,
  boxRef,
  icon,
  placeholder,
 
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

 

  useEffect(() => {

    setValue(
      name,
      selected
        ? selected?.length > 25
          ? selected?.substring(0, 25) + "..."
          : selected
        : ""
    );
  }, [selected]);

  // const handleClick = (e) => {
  //     setOpen(false);
  // }

  // useEffect(()=>{
  //   window.addEventListener('click', handleClick);
  //   return function cleanup() {
  //     window.removeEventListener('click', handleClick);
  //   }
  // },[])

  return (
    <div className="w-full font-medium relative">
      {/* <label
        htmlFor={id}
        className={` text-[0.8em] font-semibold text-gray-700  ${
          isError && "!text-red-500"
        }`}
      >
        {label}
      </label> */}
      <div
      onClick={() => setOpen((prev) => !prev)}
        className={`bg-white cursor-pointer !z-10 w-full p-[12px] px-3 mt-[2px]  shadow-lg ${
          isError && "!border-red-500"
        } flex items-center justify-between rounded-full ${
          !selected && "text-gray-700"
        }`}
        
      >
        <input
          type={type}
          
          autoComplete="off"
          id={id}
          name={name}
          className={` cursor-pointer outline-none caret-transparent h-full !z-0  w-[90%]`}
          placeholder={placeholder}
          {...register(name)}  defaultValue=""
        />

        <div className=" w-5 ">
        <DynamicIcons
              name={icon}
              style={`text-xl !text-gray-500`}
            />
          {/* <BiChevronDown size={20} className={`${open && "rotate-180"}`} /> */}
        </div>
      </div>
      {isError && (
        <span className=" text-red-500 text-sm ml-2">{errorMessage}</span>
      )}
      <ul
   
        className={`bg-white shadow-lg mt-2 overflow-y-auto max-h-60 absolute top-0  left-0 right-0 z-[10000100000000] rounded rounded-tl-xl rounded-tr-xl ${
          open ? "block" : "hidden"
        } `}
      >
        <div className="flex w-full items-center px-2 gap-2 sticky top-0 bg-white overflow-hidden">
          <div className=" absolute w-[5%]">
            <AiOutlineSearch className="text-gray-700 !text-lg" />
          </div>

          <div className="flex flex-1 ml-[20px] overflow-x-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Search here..."
              className="placeholder:text-gray-400 p-2 outline-none flex flex-1"
            />
          </div>
        </div>
        <li
          className={`p-2 text-sm hover:bg-[#ed8b00] hover:text-white
            ${selected === "" && "bg-[#ed8b00] text-white"}
            `}
          onClick={() => {
            setSelected("");
            setOpen(false);
            setInputValue("");
          }}
        >
          {firstOptionLabel}
        </li>
        {items?.map((item, index) => (
          <li
            key={index}
            className={`p-2 text-sm hover:bg-[#ed8b00] hover:text-white
            ${
              item?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-[#ed8b00] text-white"
            }
            ${
              item?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              // console.log(item?.name?.toLowerCase())
              // console.log(selected.toLowerCase())
              if (item?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(item?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {item?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchableSelectInput;
