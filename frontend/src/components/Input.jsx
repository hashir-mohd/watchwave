import React from "react";
import { useSelector } from "react-redux"; // Make sure to import useSelector

const Input = React.forwardRef(
  (
    {
      label,
      labelClasses = "",
      type = "text",
      id,
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    const theme = useSelector((state) => state.theme.theme); // Get theme from Redux store

    return (
      <>
        {label && (
          <label
            className={`mb-1 inline-block ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } ${labelClasses}`}
            htmlFor={id}
          >
            {label}
            {required && <span style={{ color: "red" }}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`rounded-lg border bg-transparent px-3 py-2 ${
            theme === "dark"
              ? "bg-[#121212] text-gray-200"
              : "bg-white text-black"
          } ${className}`}
          required={required}
          {...props}
          id={id}
        />
      </>
    );
  }
);

export default Input;
