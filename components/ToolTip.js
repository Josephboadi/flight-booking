"use client";
import React, { useRef } from "react";

const ToolTip = ({ children, tooltip }) => {
  const tooltipRef = useRef(null);
  const container = useRef(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group relative inline-block  justify-center items-center "
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-[#fff] text-black border-[1px] border-[#ed8b00] p-1 rounded absolute top-full -mt-2 whitespace-nowrap z-[19080] "
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;
