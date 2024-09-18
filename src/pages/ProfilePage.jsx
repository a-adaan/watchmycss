// import { useState, useEffect } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../assets/firebase";
import SingleCard from "../components/SingleCard";
import { useAuth } from "../assets/AuthContext";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  //   const [cards, setCards] = useState([]);

  //   useEffect(() => {
  //     // Fetch user's cards from Firestore
  //     async function fetchCards() {
  //       const q = query(
  //         collection(db, "designCard"),
  //         where("userId", "==", currentUser?.userId)
  //       );
  //       const querySnapshot = await getDocs(q);
  //       const userCards = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setCards(userCards);
  //     }

  //     fetchCards();
  //   }, [currentUser]);

  return (
    <>
      {/* Nickname */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-btn">{currentUser?.nickName}</h1>
      </div>

      {/* Cards Grid */}
      <div className="h-auto w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
        {/* {cards.length > 0 ? (
          cards.map((card) => (
        ))
    ) : (
        <p className="text-center col-span-full">No cards available.</p>
    )} */}
        <SingleCard inProfile={true} />
      </div>
    </>
  );
}
