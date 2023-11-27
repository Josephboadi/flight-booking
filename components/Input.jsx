/* eslint-disable react/prop-types */

const Input = ({
  type,
  label,
  name,
  id,
  isError,
  register,
  errorMessage,
  disabled,
}) => {
  return (
    <>
      <div className="form_div">
        <input
          type={type}
          disabled={disabled ? disabled : false}
          id={id}
          className={`form_input ${isError && "!border-red-500"}`}
          placeholder=" "
          defaultValue=""
          {...register(name, { valueAsDate: type === "date" ? true : false })}
        />
        <label
          htmlFor={id}
          className={`form_label ${isError && "!text-red-500"}`}
        >
          {label}
        </label>
      </div>
      {isError && (
        <span className=" text-red-500 text-sm ml-2">{errorMessage}</span>
      )}
    </>
  );
};

export default Input;
