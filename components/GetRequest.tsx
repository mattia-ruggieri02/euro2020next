import { useState } from "react";

interface RequestsProps {
  countryCode: string;
}

interface Player {
  id: number;
  name: string;
  name_shirt: string;
  position: string;
  birth_date: string;
}

export default function GetRequest({ countryCode }: RequestsProps) {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const url = `/api/playersApi?country_code=${countryCode}&name=${playerName}`;

      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Giocatore non trovato");

      const data: Player[] = await response.json();

      console.log("Response Data:", data);

      setPlayerData(data);
    } catch (err) {
      setPlayerData([]);
      setError((err as Error).message);
    }
  };

  return (
    <div className="mt-10 p-5 bg-blue-100 rounded-lg space-x-5">
      <h2 className="text-xl font-semibold text-teal-600 ml-5">
        Cerca un giocatore (se non viene inserito nessun giocatore saranno
        restituiti tutti i giocatori)
      </h2>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="mt-3 p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
      ></input>
      <button
        className="rounded-md px-4 py-2 bg-teal-300 text-white font-bold hover:bg-blue-600"
        onClick={handleSearch}
      >
        Cerca
      </button>
      {error && <p className="text-red-600 font font-semibold">{error}</p>}
      {playerData.length > 0 && (
        <>
          <div className="border border-teal-300 p-4 grid grid-cols-5 gap-4 bg-teal-50 rounded-lg shadow-md mt-5">
            <h2 className="font-semibold text-teal-600">Id</h2>
            <h2 className="font-semibold text-teal-600">Nome</h2>
            <h2 className="font-semibold text-teal-600">Nome sulla maglia</h2>
            <h2 className="font-semibold text-teal-600">Ruolo</h2>
            <h2 className="font-semibold text-teal-600">Data di nascita</h2>
          </div>
          {playerData.map((player, index) => (
            <div
              key={index}
              className="border border-teal-300 p-4 grid grid-cols-5 gap-4 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors shadow-md"
            >
              <p>{player.id || "Nome non disponibile"}</p>
              <p>{player.name || "Nome non disponibile"}</p>
              <p>{player.name_shirt || "Nome sulla maglia non disponibile"}</p>
              <p>{player.position || "Posizione non disponibile"}</p>
              <p>{player.birth_date || "Data di nascita non disponibile"}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
