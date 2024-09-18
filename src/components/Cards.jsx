import SingleCard from "./SingleCard";

export default function Cards() {
  return (
    <div className="h-auto w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
      <SingleCard inProfile={false} />
    </div>
  );
}
