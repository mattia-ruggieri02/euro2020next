"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Requests from "./Requests";

interface Team {
  id: string;
  name: string;
  country_code: string;
  imageUrl: string;
}

const TeamMap: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teamsApi");
        if (!response.ok) {
          throw new Error("Errore nel recuperare i dati delle squadre");
        }
        const data: Team[] = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleCardClick = (countryCode: string) => {
    setIsTransitioning(true);
    setSelectedCountryCode(countryCode);
    setTimeout(() => {
      setShowDetails(true);
      setIsTransitioning(false);
    }, 500);
  };

  const handleBackClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowDetails(false);
      setIsTransitioning(false);
    }, 500);
  };

  if (loading) {
    return <div>Caricamento delle squadre...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {!showDetails ? (
        <div
          className={`grid grid-cols-4 gap-5 px-20 my-10 transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {teams.map((team) => (
            <Card
              key={team.id}
              name={team.name}
              imageUrl={team.imageUrl}
              countryCode={team.country_code}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      ) : (
        <div
          className={`transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Requests
            countryCode={selectedCountryCode!}
            onBackClick={handleBackClick}
          />
        </div>
      )}
    </div>
  );
};

export default TeamMap;
