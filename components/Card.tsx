interface CardProps {
  name: string;
  imageUrl: string;
  countryCode: string;
  onCardClick: (countryCode: string) => void;
}

function Card({ name, imageUrl, countryCode, onCardClick }: CardProps) {
  const handleClick = () => {
    onCardClick(countryCode);
  };
  return (
    <div className="rounded-md bg-zinc-950 flex flex-col">
      <img
        src={imageUrl}
        alt=""
        className="rounded-t-md w-full h-64 object-cover"
      />
      <div className="flex flex-col p-4 flex-grow items-center">
        <h2 className="text-2xl text-white font-bold">{name}</h2>
        <p className="text-white text-lg">
          Visualizza le informazioni relative a: {name}
        </p>
        <div className="mt-auto">
          <button
            className="rounded-md px-4 py-2 bg-teal-300 text-white font-bold hover:bg-blue-600"
            onClick={handleClick}
          >
            Vai
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
