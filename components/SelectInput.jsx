/* eslint-disable react/prop-types */

const SelectInputR = ({
  items,
  firstOptionLabel,
  name,
  register,
  label,
  id,
  isError,
  errorMessage,
}) => {
  return (
    <>
      <div className="form_div">
        <label
          htmlFor={id}
          className={`form_select_label ${isError && "!text-red-500"}`}
        >
          {label}
        </label>
        <select
          name={id}
          id={id}
          className={`form_input_select ${isError && "!border-red-500"}`}
          placeholder=" "
          {...register(name)}
        >
          <option value="">{firstOptionLabel}</option>
          {items?.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {isError && (
        <span className=" text-red-500 text-sm ml-2">{errorMessage}</span>
      )}
    </>
  );
};

export default SelectInputR;
