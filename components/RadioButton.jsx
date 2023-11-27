/* eslint-disable react/prop-types */

const RadioButton = ({name, register, label, id, checked }) => {
 
  return (

    
    <>
      <label>
        <div className="flex gap-2">
          <input type="radio" id={id} value={id} {...register(name)} className="scale-125 accent-[var(--primary)]" />
          {label}
        </div>
      </label>
    </>
  );
}

export default RadioButton;
