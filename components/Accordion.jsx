import React, { useState } from "react";
import AnimateHeight from "react-animate-height";


export default function Accordion({
  buttonContent,
  children,
  initialOpen = false,
}) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div className="relative">
      <button
        className="accordion_button w-full"
        onClick={() => setOpen(!open)}>
        {buttonContent(open)}
      </button>
      <AnimateHeight
        id={"sliding_wrapper"}
        duration={300}
        height={open ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
}
