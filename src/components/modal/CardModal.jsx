import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import Demo from "./Demo";
import { useAuth } from "../../assets/AuthContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../assets/firebase";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CardModal({ inCreateBtn = false, inEdit, card }) {
  const [selectedTab, setSelectedTabs] = useState("demo");
  const { currentUser } = useAuth();
  const [src, setsrc] = useState("");
  const [html, sethtml] = useState("<h1>Hello World</h1>");
  const [css, setCSS] = useState("h1{ color: black; }");
  const [cardName, setCardName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (card) {
      sethtml(card.htmlCode);
      setCSS(card.cssCode);
      setCardName(card.cardName);
    }
  }, [card]);

  useEffect(() => {
    setsrc(`<html>
      <style>
      body {
          margin: 10px;
          padding: 0;
          overflow: hidden; /* Ensure no overflow in iframe */
        }
      ${css}</style>
      <body>${html}</body>
      </html>`);
  }, [html, css]);

  async function handleBtn() {
    const regex = /^[a-zA-Z]+[0-9]+$/;
    if (!regex.test(cardName)) {
      toast.warn("Enter the correct Card name. e.g. design123, name456", {
        position: "top-center",
        autoClose: 2500,
      });
    } else {
      try {
        const modalData = {
          userId: currentUser?.userId,
          cardName: cardName,
          htmlCode: html,
          cssCode: css,
          userName: currentUser?.nickName,
        };
        if (inEdit) {
          // Update the existing card
          const cardRef = doc(db, "designCard", card.cardName); // Use original card name
          await updateDoc(cardRef, {
            htmlCode: html,
            cssCode: css,
            cardName: cardName, // Optional: If you want to allow card name change
          });
          toast.success("Card updated successfully", {
            position: "top-center",
            autoClose: 2500,
          });
        } else {
          // Create a new card
          await setDoc(doc(db, "designCard", cardName), modalData);
          toast.success("Card created successfully", {
            position: "top-center",
            autoClose: 2500,
          });
        }
        navigate(0);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  return (
    <>
      <div className="w-3/4 h-[88svh] dark:bg-dark bg-light mx-auto rounded-lg border-2 border-btnH flex flex-col">
        <div className="grid grid-cols-2 p-[5px] gap-1">
          <button
            onClick={() => setSelectedTabs("demo")}
            className="rounded-md font-medium focus:border-b-2 focus:dark:border-b-light focus:border-b-btn hover:cursor-pointer p-3"
          >
            {inCreateBtn || inEdit ? (
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Enter card name (e.g. name32)"
                className="w-1/2 focus:outline-none bg-dark focus:border-b-2 focus:border-b-btn"
              />
            ) : (
              <span>{cardName}</span>
            )}
          </button>
          <button
            onClick={() => setSelectedTabs("html")}
            className="rounded-md font-medium focus:border-b-2 focus:dark:border-b-light focus:border-b-btn hover:cursor-pointer p-3"
          >
            Html/CSS
          </button>
        </div>
        {/* Main Tabs */}
        <div className=" w-auto h-full m-2 rounded flex-grow ">
          {selectedTab === "demo" && (
            <Demo
              handleBtn={handleBtn}
              src={src}
              inCreateBtn={inCreateBtn}
              isedit={inEdit}
            />
          )}
          {selectedTab === "html" && (
            <CodeEditor
              handlehtml={sethtml}
              handleCSS={setCSS}
              htmlValue={html}
              cssValue={css}
              inCreateBtn={inCreateBtn}
              inEdit={inEdit}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
