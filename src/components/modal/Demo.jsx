export default function Demo({ src, handleBtn, inCreateBtn, isedit }) {
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
            onClick={handleBtn}
            className={`bg-btn hover:bg-btnH mr-5 py-3 px-5 text-xl font-semibold rounded-lg 
            cursor-pointer
          `}
          >
            {inCreateBtn && "Create"}
            {isedit && "Update"}
          </button>
        )}
      </div>
    </div>
  );
}
