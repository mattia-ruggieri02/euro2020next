import { useState } from "react";

interface RequestsProps {
  countryCode: string;
}

interface Player {
  id: string;
  country_code: string;
}

export default function PutRequest({ countryCode }: RequestsProps) {
  const [playerToModify, setPlayerToModify] = useState<Player>({
    id: "",
    country_code: countryCode,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [infoToUpdate, setInfoToUpdate] = useState<string>("name");
  const [newData, setNewData] = useState<string>("");

  const handleInfoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInfoToUpdate(e.target.value);
  };

  const handleNewDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewData(e.target.value);
  };

  const handleModifyPlayer = async () => {
    if (!playerToModify.id || !newData) {
      setError("Id e nuovo dato sono necessari");
      setSuccess(null);
      return;
    }

    const updatedPlayer = {
      id: playerToModify.id,
      country_code: playerToModify.country_code,
      infoToUpdate,
      newData,
    };

    try {
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/playersApi", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedPlayer),
      });

      if (!res.ok) throw new Error("Errore nella modifica del giocatore");

      setSuccess("Giocatore modificato con successo!");
    } catch (err) {
      setError((err as Error).message);
      setSuccess(null);
    }
  };

  return (
    <div className="mt-10 p-5 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-semibold text-teal-600 ml-5">
        Modifica le informazioni di un giocatore
      </h2>
      <p className="font-semibold text-black">Id del giocatore da modificare</p>
      <input
        type="number"
        value={playerToModify.id}
        onChange={(e) =>
          setPlayerToModify({ ...playerToModify, id: e.target.value })
        }
        className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
        required
      />

      <p className="font-semibold text-black">Dato da modificare</p>
      <select
        id="info_to_update"
        value={infoToUpdate}
        onChange={handleInfoChange}
        className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
        required
      >
        <option className="font-semibold text-black" value="name">
          Nome
        </option>
        <option className="font-semibold text-black" value="name_shirt">
          Nome sulla maglia
        </option>
        <option className="font-semibold text-black" value="position">
          Posizione
        </option>
        <option className="font-semibold text-black" value="birth_date">
          Data di nascita
        </option>
      </select>

      <p className="font-semibold text-black">Nuovo dato</p>
      {infoToUpdate === "birth_date" ? (
        <input
          type="date"
          value={newData}
          onChange={handleNewDataChange}
          className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
          required
        />
      ) : (
        <input
          type="text"
          value={newData}
          onChange={handleNewDataChange}
          className="p-3 border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-lg"
          required
        />
      )}

      <button
        type="button"
        onClick={handleModifyPlayer}
        className=" ml-5 rounded-md px-4 py-2 bg-teal-300 text-white font-bold hover:bg-blue-600"
      >
        Modifica Giocatore
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      {success && <p className="text-green-600 mt-3">{success}</p>}
    </div>
  );
}
