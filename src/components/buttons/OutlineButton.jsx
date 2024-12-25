import { cn } from "../../lib/utils";

const OutlineButton = ({ children, className, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 ",
        className
      )}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
