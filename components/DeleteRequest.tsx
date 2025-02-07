import { useState } from "react";

interface RequestsProps {
  countryCode: string;
}

interface Player {
  id: string;
  country_code: string;
}

export default function DeleteRequest({ countryCode }: RequestsProps) {
  const [playerToDelete, setPlayerToDelete] = useState<Player>({
    id: "",
    country_code: countryCode,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<String | null>(null);

  const handleDeletePlayer = async () => {
    if (!playerToDelete.id) {
      setError("E' necessario l'id");
      setSuccess(null);
      return;
    }

    const deletedPlayer = {
      id: playerToDelete.id,
      country_code: playerToDelete.country_code,
    };

    try {
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/playersApi", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(deletedPlayer),
      });

      if (!res.ok) throw new Error("Errore nell'eliminazione del giocatore");

      setSuccess("Giocatore eliminato con successo!");
    } catch (err) {
      setError((err as Error).message);
      setSuccess(null);
    }
  };

  return (
    <div className="mt-10 p-5 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-semibold text-teal-600 ml-5">
        Elimina un giocatore
      </h2>
      <p className="mt-3 font-semibold text-black">
        Id del giocatore da eliminare
      </p>
      <input
        type="number"
        onChange={(e) =>
          setPlayerToDelete({ ...playerToDelete, id: e.target.value })
        }
        className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
        required
      />
      <button
        type="button"
        onClick={handleDeletePlayer}
        className=" ml-5 rounded-md px-4 py-2 bg-teal-300 text-white font-bold hover:bg-blue-600"
      >
        Elimina Giocatore
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600 mt-3">{success}</p>}
    </div>
  );
}
