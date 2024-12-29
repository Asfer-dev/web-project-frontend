import React from "react";
import { cn } from "../../lib/utils";

const PillButton = ({ children, variant, className, handleClick }) => {
  if (variant === "light") {
    return (
      <button
        onClick={handleClick}
        type="button"
        className={cn(
          "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
          className
        )}
      >
        {children}
      </button>
    );
  }
  if (variant === "alternative") {
    return (
      <button
        onClick={handleClick}
        type="button"
        className={cn(
          "py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
          className
        )}
      >
        {children}
      </button>
    );
  }
  if (variant === "black") {
    return (
      <button
        onClick={handleClick}
        type="button"
        className={cn(
          "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
          className
        )}
      >
        {children}
      </button>
    );
  }
};

export default PillButton;
