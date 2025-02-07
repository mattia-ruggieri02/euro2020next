import { useState } from "react";

interface RequestsProps {
  countryCode: string;
}

interface Player {
  country_code: string;
  name: string;
  name_shirt: string;
  position: string;
  birth_date: string;
  year: string;
}

export default function PostRequest({ countryCode }: RequestsProps) {
  const [newPlayer, setNewPlayer] = useState<Player>({
    country_code: countryCode,
    name: "",
    name_shirt: "",
    position: "",
    birth_date: "",
    year: "2020",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddPlayer = async () => {
    if (
      !newPlayer.name ||
      !newPlayer.name_shirt ||
      !newPlayer.position ||
      !newPlayer.birth_date ||
      !newPlayer.year
    ) {
      setError("Tutti i campi sono necessari");
      setSuccess(null);
      return;
    }

    try {
      setError(null);

      const res = await fetch("/api/playersApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      if (!res.ok) throw new Error("Errore nell'aggiunta del giocatore");
      setSuccess("Giocatore aggiunto con succeso!");
    } catch (err) {
      setError((err as Error).message);
      setSuccess(null);
    }
  };
  return (
    <div className="mt-10 p-5 bg-blue-100 rounded-lg space-x-5">
      <h2 className="text-xl font-semibold text-teal-600 ml-5">
        Aggiungi un giocatore
      </h2>
      <p className="mt-3 font-semibold text-black">Nome</p>
      <input
        type="text"
        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
      ></input>
      <p className="font-semibold text-black">Nome sulla maglia</p>
      <input
        type="text"
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, name_shirt: e.target.value })
        }
        className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
      ></input>
      <p className="font-semibold text-black">Posizione (in inglese)</p>
      <input
        type="text"
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, position: e.target.value })
        }
        className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
      ></input>
      <p className="font-semibold text-black">Data di nascita</p>
      <input
        type="date"
        onChange={(e) =>
          setNewPlayer({ ...newPlayer, birth_date: e.target.value })
        }
        className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
      ></input>
      <button
        className="rounded-md px-4 py-2 bg-teal-300 text-white font-bold hover:bg-blue-600"
        onClick={handleAddPlayer}
      >
        Aggiungi
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="font-semibold text-black">{success}</p>}
    </div>
  );
}
