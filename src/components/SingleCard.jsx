import { useState } from "react";
import CardModal from "./modal/CardModal";
import { IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../assets/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SingleCard({ inProfile, card }) {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const handleModal = () => {
    setShowModal(true); // Open the modal for editing
  };

  const handleDelete = async () => {
    if (card?.cardName) {
      try {
        await deleteDoc(doc(db, "designCard", card?.cardName));
        toast.success("Card deleted successfully", {
          position: "top-center",
          autoClose: 2500,
        });
        navigate(0); // Refresh page
      } catch (error) {
        console.error("Error deleting document:", error.message);
      }
    }
  };

  // Create the iframe content dynamically with HTML and CSS
  const srcDoc = `
    <html>
      <style>
      body {
          margin: 10px;
          padding: 0;
          overflow: hidden; /* Ensure no overflow in iframe */
        }
      ${card.cssCode}</style>
      <body>${card.htmlCode}</body>
    </html>
  `;

  return (
    <>
      <div
        onClick={() => !inProfile && handleModal()}
        className="relative h-[50vh] min-w-[300px] dark:border-none border-dark border-4 dark:bg-btnH hover:bg-btn bg-dark text-light my-5 hover:drop-shadow-3xl hover:cursor-pointer rounded-xl hover:scale-[1.05] ease-in-out duration-300"
      >
        {/* Live demo section */}
        <div className="w-full h-[40svh] bg-light rounded-lg">
          {/* Use iframe to show live demo */}
          <iframe
            srcDoc={srcDoc}
            className="w-full h-full rounded-lg "
            sandbox="allow-scripts"
            title="Live Demo"
          />
        </div>

        {/* Title and author section */}
        <div className="mx-3 my-2">
          <span className="text-xl font-semibold block">{card.cardName}</span>
          <span className="text-sm font-medium text-[#c0c0c0]">
            By <span className="font-bold">{card?.userName}</span>
          </span>
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
              className=" px-3 py-2 rounded bg-dark"
            >
              <CiEdit size={25} className="text-light dark:text-light" />
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-2 rounded bg-dark"
            >
              <MdDeleteOutline
                size={25}
                className="text-light dark:text-light"
              />
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
          <CardModal inEdit={isEdit} card={card} />
        </div>
      )}
    </>
  );
}
