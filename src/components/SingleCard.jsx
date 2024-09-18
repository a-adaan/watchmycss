import { useState } from "react";
import CardModal from "./modal/CardModal";
import { IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function SingleCard({ inProfile }) {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleModal = () => {
    setShowModal(true); // Open the modal for editing
  };

  const handleDelete = () => {
    console.log("Delete card");
  };

  return (
    <>
      <div
        onClick={() => !inProfile && handleModal()}
        className="relative h-[50vh] min-w-[300px] dark:bg-btnH hover:bg-btn bg-dark text-light my-5 hover:drop-shadow-3xl hover:cursor-pointer rounded-xl hover:scale-[1.05] ease-in-out duration-300"
      >
        {/* Live demo section */}
        <div className="w-full h-[40svh] bg-dark rounded-lg">live</div>

        {/* Title and author section */}
        <div className="m-3">
          <span className="text-xl font-semibold block">Card name</span>
          <span className="text-sm font-medium text-[#c0c0c0]">By</span>
        </div>

        {/* Edit and Delete buttons (conditionally visible) */}
        {inProfile && (
          <div className="absolute top-3 right-3 z-20 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(true);
                handleModal();
              }}
              className=" px-3 py-2 rounded "
            >
              <CiEdit size={25} />
            </button>
            <button onClick={handleDelete} className="px-3 py-2 rounded">
              <MdDeleteOutline size={25} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 h-full w-full flex flex-col justify-center items-center z-50 backdrop-blur-sm">
          <button
            onClick={() => setShowModal(false)}
            className="mb-3 p-3 rounded-full hover:scale-110 duration-100"
          >
            <IoCloseOutline size={32} />
          </button>
          <CardModal inEdit={isEdit} />
        </div>
      )}
    </>
  );
}
