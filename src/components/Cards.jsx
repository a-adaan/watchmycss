import { useLoaderData } from "react-router-dom";
import { db } from "../assets/firebase";
import SingleCard from "./SingleCard";
import { collection, getDocs } from "firebase/firestore";

export default function Cards() {
  const cardData = useLoaderData();

  return (
    <div className="h-auto w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
      {cardData.map((card) => (
        <SingleCard inProfile={false} card={card} key={card.cardName} />
      ))}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const cardLoader = async () => {
  const querySnapshot = await getDocs(collection(db, "designCard"));
  const cards = [];
  querySnapshot.forEach((doc) => {
    cards.push({ ...doc.data() });
  });
  return cards;
};
