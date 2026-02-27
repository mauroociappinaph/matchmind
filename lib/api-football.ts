import { Match, MatchDetail, Lineup, MatchEvent, LeagueId } from "@/types";

const BASE_URL = "https://v3.football.api-sports.io";

// Cliente simple para API-Football
async function fetchFromAPI(endpoint: string, params: Record<string, string> = {}) {
  const API_KEY = process.env.FOOTBALL_API_KEY || "";

  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      "x-apisports-key": API_KEY,
    },
    next: { revalidate: 30 },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return data;
}

// Obtener partidos del día para las ligas seleccionadas
export async function getFixtures(date?: string, leagues?: LeagueId[]): Promise<Match[]> {
  const today = date || new Date().toISOString().split("T")[0];
  const leagueIds = leagues || [128, 39, 140];

  const allMatches: Match[] = [];

  for (const leagueId of leagueIds) {
    try {
      const data = await fetchFromAPI("/fixtures", {
        date: today,
        league: leagueId.toString(),
      });

      if (data.response && Array.isArray(data.response)) {
        allMatches.push(...data.response);
      }
    } catch (error) {
      console.error(`Error fetching league ${leagueId}:`, error);
    }
  }

  return allMatches;
}

// Obtener partidos en vivo
export async function getLiveFixtures(leagues?: LeagueId[]): Promise<Match[]> {
  const leagueIds = leagues || [128, 39, 140];

  const allMatches: Match[] = [];

  for (const leagueId of leagueIds) {
    try {
      const data = await fetchFromAPI("/fixtures", {
        live: "all",
        league: leagueId.toString(),
      });

      if (data.response && Array.isArray(data.response)) {
        allMatches.push(...data.response);
      }
    } catch (error) {
      console.error(`Error fetching live league ${leagueId}:`, error);
    }
  }

  return allMatches;
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
