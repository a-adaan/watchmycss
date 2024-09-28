import { useState } from "react";

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export default function Demo({ src, handleBtn, inCreateBtn, isedit }) {
  const [loading, setLoading] = useState(false); // State to show the loader

  const throttledHandleBtn = throttle(() => {
    setLoading(true); // Start the loader
    handleBtn(); // Call the actual function
    setTimeout(() => {
      setLoading(false); // Stop the loader after 1 second
    }, 1000);
  }, 1000);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex-grow mb-2 flex justify-center items-center">
        <iframe
          srcDoc={src}
          className="w-[90%] h-[90%] bg-textO rounded"
          title="Demo Frame"
        />
      </div>
      <div className=" w-full flex justify-end my-2 ">
        {(inCreateBtn || isedit) && (
          <button
            onClick={throttledHandleBtn} // Use the throttled function here
            className={`bg-btn hover:bg-btnH mr-5 py-3 px-5 text-xl font-semibold rounded-lg 
            cursor-pointer
          `}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <span>Loading...</span> // Show loading text when in throttle
            ) : (
              <span>{inCreateBtn ? "Create" : "Update"}</span> // Show action text
            )}
          </button>
        )}
      </div>
    </div>
  );
}
