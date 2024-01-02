import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      <input
        type={type}
        className={`px-4 py-2 my-2 w-11/12 rounded-md border-2 border-gray-300 bg-white  text-black outline-none focus:bg-gray-50 duration-200   ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
