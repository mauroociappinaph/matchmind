import { Match, MatchDetail, Lineup, MatchEvent, LeagueId } from "@/types";
import { CURRENT_SEASON } from "./constants";

const BASE_URL = "https://v3.football.api-sports.io";

// Cliente simple para API-Football
async function fetchFromAPI(endpoint: string, params: Record<string, string> = {}) {
  const API_KEY = process.env.FOOTBALL_API_KEY || "";

  console.log("[API-Football] Using API Key:", API_KEY ? "Presente" : "FALTANTE");
  console.log("[API-Football] Endpoint:", endpoint);
  console.log("[API-Football] Params:", params);

  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      "x-apisports-key": API_KEY,
    },
    next: { revalidate: 30 }, // Cache por 30 segundos
  });

  const data = await response.json();
  console.log("[API-Football] Response status:", response.status);
  console.log("[API-Football] Response data:", JSON.stringify(data).slice(0, 500));

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${JSON.stringify(data)}`);
  }

  return data;
}

// Obtener partidos del día para las ligas seleccionadas
export async function getFixtures(date?: string, leagues?: LeagueId[]): Promise<Match[]> {
  const today = date || new Date().toISOString().split("T")[0];
  const leagueIds = leagues?.join(",") || "128,39,140";

  const data = await fetchFromAPI("/fixtures", {
    date: today,
    league: leagueIds,
    season: CURRENT_SEASON.toString(),
    timezone: "America/Argentina/Buenos_Aires",
  });

  return data.response || [];
}

// Obtener partidos en vivo
export async function getLiveFixtures(leagues?: LeagueId[]): Promise<Match[]> {
  const leagueIds = leagues?.join(",") || "128,39,140";

  const data = await fetchFromAPI("/fixtures", {
    live: "all",
    league: leagueIds,
  });

  return data.response || [];
}

// Obtener detalle de un partido específico
export async function getMatchDetail(fixtureId: number): Promise<MatchDetail | null> {
  const data = await fetchFromAPI("/fixtures", {
    id: fixtureId.toString(),
  });

  if (!data.response || data.response.length === 0) {
    return null;
  }

  return data.response[0];
}

// Obtener formaciones de un partido
export async function getMatchLineups(fixtureId: number): Promise<Lineup | null> {
  const data = await fetchFromAPI("/fixtures/lineups", {
    fixture: fixtureId.toString(),
  });

  if (!data.response || data.response.length === 0) {
    return null;
  }

  return { response: data.response };
}

// Obtener eventos de un partido
export async function getMatchEvents(fixtureId: number): Promise<MatchEvent[]> {
  const data = await fetchFromAPI("/fixtures/events", {
    fixture: fixtureId.toString(),
  });

  return data.response || [];
}

// Obtener estadísticas de un partido
export async function getMatchStatistics(fixtureId: number) {
  const data = await fetchFromAPI("/fixtures/statistics", {
    fixture: fixtureId.toString(),
  });

  return data.response || [];
}
