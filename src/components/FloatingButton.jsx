import { useState } from "react";
import { useAuth } from "../assets/AuthContext";
import { IoCloseOutline } from "react-icons/io5";
import CardModal from "./modal/CardModal";

export default function FloatingButton() {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();
  // Handles the button click
  const handleModal = () => {
    setShowModal(!showModal); // Open modal for CSS design creation
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleModal}
        className={`fixed bottom-16 right-10 px-6 py-4 font-bold rounded-full ${
          currentUser ? "bg-[#4CAF50]" : "bg-[#FF0000]"
        }`}
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
      >
        Create CSS Design
      </button>

      {/* Modal for creating CSS design (Only when logged in) */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-dark backdrop-blur-md bg-opacity-50 z-50">
          {currentUser ? (
            <div className="fixed top-0 left-0 h-full w-full flex flex-col justify-center items-center z-10 backdrop-blur-sm">
              <button
                onClick={handleModal}
                className="mb-3 p-3 rounded-full hover:scale-110 duration-100"
              >
                <IoCloseOutline size={32} />
              </button>
              <CardModal inCreateBtn={true} />
            </div>
          ) : (
            <div className=" p-8 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="text-2xl font-bold mb-4">Login First</h2>
              <p>Please login to continue...</p>
              {/* Add form or content here for creating CSS design */}
              <button
                onClick={handleModal}
                className="mt-4 px-4 py-2 bg-[#FF0000] text-white rounded"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
