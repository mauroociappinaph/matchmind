import { LeagueOption } from "@/types";

// IDs de las ligas soportadas
export const LEAGUES = {
  ARGENTINA: 128,      // Primera División Argentina
  PREMIER: 39,         // Premier League
  LA_LIGA: 140,        // La Liga española
} as const;

// Temporada actual
export const CURRENT_SEASON = 2024;

// Opciones de ligas para el UI
export const LEAGUE_OPTIONS: LeagueOption[] = [
  { id: LEAGUES.ARGENTINA, name: "Primera División", country: "Argentina", emoji: "🇦🇷" },
  { id: LEAGUES.PREMIER, name: "Premier League", country: "Inglaterra", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: LEAGUES.LA_LIGA, name: "La Liga", country: "España", emoji: "🇪🇸" },
];

// Mapeo de estados de partido
export const MATCH_STATUS = {
  NS: "No iniciado",
  L1: "Primer tiempo",
  HT: "Entretiempo",
  L2: "Segundo tiempo",
  ET: "Tiempo extra",
  P: "Penales",
  FT: "Finalizado",
  AET: "Finalizado (TE)",
  PEN: "Finalizado (P)",
  LIVE: "En vivo",
} as const;

// Colores para tipos de eventos tácticos
export const TACTICAL_COLORS = {
  FORMATION: "bg-blue-500",
  SUBSTITUTION: "bg-yellow-500",
  GOAL: "bg-green-500",
  RED_CARD: "bg-red-600",
  YELLOW_CARD: "bg-yellow-400",
  TACTICAL_SHIFT: "bg-purple-500",
} as const;

// Iconos para eventos
export const TACTICAL_ICONS = {
  FORMATION: "🔄",
  SUBSTITUTION: "⚡",
  GOAL: "⚽",
  RED_CARD: "🟥",
  YELLOW_CARD: "🟨",
  TACTICAL_SHIFT: "🧠",
} as const;
