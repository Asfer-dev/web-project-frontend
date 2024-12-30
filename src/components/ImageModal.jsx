import { cn } from "../lib/utils";

const ImageModal = ({ isVisible, closeModal, imageUrl }) => {
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className={cn(
        "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full",
        isVisible ? "flex" : "hidden"
      )}
      onClick={closeModal}
    >
      <div className="relative p-4 w-full max-w-full max-h-full z-[130]">
        <div className="relative">
          <button
            onClick={closeModal}
            type="button"
            className="absolute -top-1.5 -end-1 text-gray-400 bg-transparent hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 flex items-center justify-center">
            <img
              className="max-h-[calc(100vh-5rem)]"
              src={`${imageUrl}`}
              alt=""
            />
          </div>
        </div>
      </div>
      <div onClick={closeModal} className="fixed inset-0 bg-zinc-200/80"></div>
    </div>
  );
};

export default ImageModal;
