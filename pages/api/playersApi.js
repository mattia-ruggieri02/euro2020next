import { error } from "console";
import csv from "csv-parser";
import fs from "fs";

export default function handler(req, res) {
  const { query } = req;
  const players = [];
  const header = "id,country_code,name,name_shirt,position,birth_date,year"; // Intestazioni fisse

  fs.createReadStream("public/euro_lineups.csv")
    .pipe(csv())
    .on("data", (row) => {
      players.push(row);
    })
    .on("end", () => {
      let filteredPlayers = [...players];

      if (query.country_code) {
        filteredPlayers = filteredPlayers.filter((player) =>
          player.country_code
            .toLowerCase()
            .includes(query.country_code.toLowerCase())
        );
      }

      if (req.method === "GET") {
        if (query.country_code) {
          filteredPlayers = filteredPlayers.filter((player) =>
            player.country_code
              .toLowerCase()
              .includes(query.country_code.toLowerCase())
          );
        }
        if (query.name) {
          const decodedName = decodeURIComponent(query.name).toLowerCase();
          filteredPlayers = filteredPlayers.filter((player) =>
            player.name.toLowerCase().includes(decodedName)
          );
        }
        if (filteredPlayers.length === 0) {
          return res.status(404).json(error);
        }
      }

      if (req.method === "POST") {
        const { country_code, name, name_shirt, position, birth_date, year } =
          req.body;
        if (
          !country_code ||
          !name ||
          !name_shirt ||
          !position ||
          !birth_date ||
          !year
        ) {
          return res.status(400).json({ error: "Dati mancanti" });
        }

        let lastPlayerId = 0;

        if (fs.existsSync("public/euro_lineups.csv")) {
          const csvData = fs.readFileSync("public/euro_lineups.csv", "utf-8");

          if (csvData.trim().length > 0) {
            const rows = csvData.split("\n").slice(1);
            rows.forEach((row) => {
              const columns = row.split(",");
              if (columns.length > 0) {
                const id = columns[0].trim();
                if (!isNaN(id)) {
                  lastPlayerId = Math.max(lastPlayerId, parseInt(id));
                }
              }
            });
          }
        }

        const newId = lastPlayerId + 1;
        const newPlayer = {
          id: newId,
          country_code,
          name,
          name_shirt,
          position,
          birth_date,
          year,
        };

        const newPlayerRow = `\n${newId},${country_code},${name},${name_shirt},${position},${birth_date},${year}`;

        fs.appendFileSync("public/euro_lineups.csv", newPlayerRow);

        return res.status(201).json(newPlayer);
      }

      if (req.method === "PUT") {
        const { id, country_code, infoToUpdate, newData } = req.body;

        if (!id || !country_code || !infoToUpdate || !newData) {
          return res
            .status(400)
            .json({ error: "Tutti i campi sono necessari" });
        }

        const playerIndex = players.findIndex(
          (player) => player.id === id && player.country_code === country_code
        );

        if (playerIndex === -1) {
          return res.status(404).json({ error: "Giocatore non trovato" });
        }

        players[playerIndex] = {
          ...players[playerIndex],
          [infoToUpdate]: newData,
        };

        const csvData = players
          .map(
            (player) =>
              `${player.id},${player.country_code},${player.name},${player.name_shirt},${player.position},${player.birth_date},${player.year}`
          )
          .join("\n");

        fs.writeFileSync("public/euro_lineups.csv", `${header}\n${csvData}`);

        return res.status(200).json(players[playerIndex]);
      }

      if (req.method === "DELETE") {
        const { id, country_code } = req.body;

        if (!id || !country_code) {
          return res.status(400).json({
            error: "Dati mancanti",
          });
        }

        const playerIndex = players.findIndex(
          (player) => player.id === id && player.country_code === country_code
        );

        if (playerIndex === -1) {
          return res.status(404).json({ error: "Giocatore non trovato" });
        }

        const deletedPlayer = players.splice(playerIndex, 1)[0];

        const csvData = players
          .map(
            (player) =>
              `${player.id},${player.country_code},${player.name},${player.name_shirt},${player.position},${player.birth_date},${player.year}`
          )
          .join("\n");

        fs.writeFileSync("public/euro_lineups.csv", `${header}\n${csvData}`);

        return res.status(200).json(deletedPlayer);
      }

      res.status(200).json(filteredPlayers);
    })
    .on("error", (err) => {
      res.status(500).json({ error: "Errore nella lettura del file CSV" });
    });
}
