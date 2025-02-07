import csv from "csv-parser";
import fs from "fs";

export default function handler(req, res) {
  const teams = [];

  fs.createReadStream("public/teams.csv")
    .pipe(csv())
    .on("data", (row) => {
      teams.push(row);
    })
    .on("end", () => {
      res.status(200).json(teams);
    })
    .on("error", (err) => {
      res.status(500).json({ error: "Errore nella lettura del file CSV" });
    });
}
