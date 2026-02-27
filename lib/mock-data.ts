import { Match, MatchDetail, Lineup, MatchEvent, TacticalInsight } from "@/types";

// Partidos de ejemplo para demo
export const MOCK_MATCHES: Match[] = [
  {
    fixture: {
      id: 1001,
      referee: "Fernando Rapallini",
      timezone: "America/Argentina/Buenos_Aires",
      date: "2026-02-27T21:00:00+00:00",
      timestamp: 1772293200,
      periods: { first: 1772293200, second: 1772296800 },
      venue: { id: 105, name: "La Bombonera", city: "Buenos Aires" },
      status: { long: "Second Half", short: "L2", elapsed: 67, extra: null }
    },
    league: {
      id: 128,
      name: "Primera División",
      country: "Argentina",
      logo: "https://media.api-sports.io/football/leagues/128.png",
      flag: "https://media.api-sports.io/flags/ar.svg"
    },
    teams: {
      home: {
        id: 451,
        name: "Boca Juniors",
        logo: "https://media.api-sports.io/football/teams/451.png"
      },
      away: {
        id: 455,
        name: "River Plate",
        logo: "https://media.api-sports.io/football/teams/455.png"
      }
    },
    goals: { home: 2, away: 1 },
    score: {
      halftime: { home: 1, away: 0 },
      fulltime: { home: null, away: null },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null }
    }
  },
  {
    fixture: {
      id: 1002,
      referee: null,
      timezone: "America/Argentina/Buenos_Aires",
      date: "2026-02-27T23:30:00+00:00",
      timestamp: 1772302200,
      periods: { first: null, second: null },
      venue: { id: 106, name: "Estadio Ciudad de La Plata", city: "La Plata" },
      status: { long: "Not Started", short: "NS", elapsed: null, extra: null }
    },
    league: {
      id: 128,
      name: "Primera División",
      country: "Argentina",
      logo: "https://media.api-sports.io/football/leagues/128.png",
      flag: "https://media.api-sports.io/flags/ar.svg"
    },
    teams: {
      home: {
        id: 457,
        name: "Estudiantes",
        logo: "https://media.api-sports.io/football/teams/457.png"
      },
      away: {
        id: 458,
        name: "Racing Club",
        logo: "https://media.api-sports.io/football/teams/458.png"
      }
    },
    goals: { home: null, away: null },
    score: {
      halftime: { home: null, away: null },
      fulltime: { home: null, away: null },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null }
    }
  },
  {
    fixture: {
      id: 1003,
      referee: "Piero Maza",
      timezone: "America/Argentina/Buenos_Aires",
      date: "2026-02-26T21:00:00+00:00",
      timestamp: 1772206800,
      periods: { first: 1772206800, second: 1772210400 },
      venue: { id: 107, name: "Estadio Monumental", city: "Buenos Aires" },
      status: { long: "Match Finished", short: "FT", elapsed: 90, extra: null }
    },
    league: {
      id: 128,
      name: "Primera División",
      country: "Argentina",
      logo: "https://media.api-sports.io/football/leagues/128.png",
      flag: "https://media.api-sports.io/flags/ar.svg"
    },
    teams: {
      home: {
        id: 460,
        name: "San Lorenzo",
        logo: "https://media.api-sports.io/football/teams/460.png"
      },
      away: {
        id: 461,
        name: "Independiente",
        logo: "https://media.api-sports.io/football/teams/461.png"
      }
    },
    goals: { home: 1, away: 1 },
    score: {
      halftime: { home: 0, away: 0 },
      fulltime: { home: 1, away: 1 },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null }
    }
  }
];

// Detalle completo de un partido (Boca vs River)
export const MOCK_MATCH_DETAIL: MatchDetail = {
  ...MOCK_MATCHES[0],
  lineups: {
    response: [
      {
        team: {
          id: 451,
          name: "Boca Juniors",
          logo: "https://media.api-sports.io/football/teams/451.png"
        },
        formation: "4-3-3",
        startXI: [
          { player: { id: 1, name: "Sergio Romero", number: 1, pos: "G", grid: "1:1" } },
          { player: { id: 2, name: "Luis Advíncula", number: 17, pos: "D", grid: "2:4" } },
          { player: { id: 3, name: "Nicolás Figal", number: 5, pos: "D", grid: "2:3" } },
          { player: { id: 4, name: "Marcos Rojo", number: 6, pos: "D", grid: "2:2" } },
          { player: { id: 5, name: "Frank Fabra", number: 18, pos: "D", grid: "2:1" } },
          { player: { id: 6, name: "Pol Fernández", number: 8, pos: "M", grid: "3:3" } },
          { player: { id: 7, name: "Equi Fernández", number: 21, pos: "M", grid: "3:2" } },
          { player: { id: 8, name: "Alan Varela", number: 33, pos: "M", grid: "3:1" } },
          { player: { id: 9, name: "Luis Vázquez", number: 9, pos: "F", grid: "4:3" } },
          { player: { id: 10, name: "Miguel Merentiel", number: 16, pos: "F", grid: "4:2" } },
          { player: { id: 11, name: "Kevin Zenón", number: 22, pos: "F", grid: "4:1" } }
        ],
        substitutes: [
          { player: { id: 12, name: "Leandro Brey", number: 12, pos: "G", grid: null } },
          { player: { id: 13, name: "Cristian Lema", number: 2, pos: "D", grid: null } },
          { player: { id: 14, name: "Marcelo Saracchi", number: 3, pos: "D", grid: null } },
          { player: { id: 15, name: "Ezequiel Fernández", number: 20, pos: "M", grid: null } },
          { player: { id: 16, name: "Janson", number: 10, pos: "F", grid: null } }
        ],
        coach: { id: 1, name: "Diego Martínez", photo: null }
      },
      {
        team: {
          id: 455,
          name: "River Plate",
          logo: "https://media.api-sports.io/football/teams/455.png"
        },
        formation: "4-4-2",
        startXI: [
          { player: { id: 101, name: "Franco Armani", number: 1, pos: "G", grid: "1:1" } },
          { player: { id: 102, name: "Andrés Herrera", number: 4, pos: "D", grid: "2:4" } },
          { player: { id: 103, name: "Leandro González Pírez", number: 14, pos: "D", grid: "2:3" } },
          { player: { id: 104, name: "Paulo Díaz", number: 17, pos: "D", grid: "2:2" } },
          { player: { id: 105, name: "Enzo Díaz", number: 13, pos: "D", grid: "2:1" } },
          { player: { id: 106, name: "Rodrigo Aliendro", number: 29, pos: "M", grid: "3:4" } },
          { player: { id: 107, name: "Rodrigo Villagra", number: 16, pos: "M", grid: "3:3" } },
          { player: { id: 108, name: "Ignacio Fernández", number: 26, pos: "M", grid: "3:2" } },
          { player: { id: 109, name: "Manuel Lanzini", number: 10, pos: "M", grid: "3:1" } },
          { player: { id: 110, name: "Paulo Solari", number: 28, pos: "F", grid: "4:2" } },
          { player: { id: 111, name: "Miguel Borja", number: 9, pos: "F", grid: "4:1" } }
        ],
        substitutes: [
          { player: { id: 112, name: "Jeremías Ledesma", number: 22, pos: "G", grid: null } },
          { player: { id: 113, name: "Marcelo Herrera", number: 15, pos: "D", grid: null } },
          { player: { id: 114, name: "Gonzalo Montiel", number: 2, pos: "D", grid: null } },
          { player: { id: 115, name: "Franco Mastantuono", number: 30, pos: "M", grid: null } },
          { player: { id: 116, name: "Salomón Rondón", number: 24, pos: "F", grid: null } }
        ],
        coach: { id: 2, name: "Marcelo Gallardo", photo: null }
      }
    ]
  },
  events: [
    { time: { elapsed: 0, extra: null }, team: { id: 451, name: "Boca Juniors", logo: "" }, player: { id: 1, name: null }, assist: { id: null, name: null }, type: "Card", detail: "Yellow Card", comments: null },
    { time: { elapsed: 23, extra: null }, team: { id: 451, name: "Boca Juniors", logo: "" }, player: { id: 9, name: "Miguel Merentiel" }, assist: { id: 6, name: "Pol Fernández" }, type: "Goal", detail: "Normal Goal", comments: null },
    { time: { elapsed: 34, extra: null }, team: { id: 455, name: "River Plate", logo: "" }, player: { id: 107, name: "Rodrigo Villagra" }, assist: { id: null, name: null }, type: "Card", detail: "Yellow Card", comments: null },
    { time: { elapsed: 45, extra: 2 }, team: { id: 455, name: "River Plate", logo: "" }, player: { id: 108, name: "Ignacio Fernández" }, assist: { id: 109, name: "Manuel Lanzini" }, type: "Goal", detail: "Normal Goal", comments: null },
    { time: { elapsed: 56, extra: null }, team: { id: 451, name: "Boca Juniors", logo: "" }, player: { id: 8, name: "Alan Varela" }, assist: { id: null, name: null }, type: "Card", detail: "Yellow Card", comments: null },
    { time: { elapsed: 62, extra: null }, team: { id: 451, name: "Boca Juniors", logo: "" }, player: { id: 11, name: "Kevin Zenón" }, assist: { id: 9, name: "Luis Vázquez" }, type: "Goal", detail: "Normal Goal", comments: null },
    { time: { elapsed: 67, extra: null }, team: { id: 455, name: "River Plate", logo: "" }, player: { id: 115, name: "Franco Mastantuono" }, assist: { id: 108, name: null }, type: "subst", detail: "Substitution 1", comments: null },
    { time: { elapsed: 75, extra: null }, team: { id: 455, name: "River Plate", logo: "" }, player: { id: 116, name: "Salomón Rondón" }, assist: { id: 111, name: null }, type: "subst", detail: "Substitution 2", comments: null }
  ],
  tacticalInsights: [
    {
      id: "1",
      timestamp: Date.now(),
      minute: 0,
      type: "FORMATION",
      title: "Alineación Boca Juniors",
      description: "🔄 Boca sale con 4-3-3: enfoque ofensivo con bandas, buscando amplitud.",
      icon: "🔄",
      team: "home",
      importance: "medium"
    },
    {
      id: "2",
      timestamp: Date.now(),
      minute: 0,
      type: "FORMATION",
      title: "Alineación River Plate",
      description: "🔄 River sale con 4-4-2: equilibrio entre defensa y ataque, clásico 4-4-2.",
      icon: "🔄",
      team: "away",
      importance: "medium"
    },
    {
      id: "3",
      timestamp: Date.now(),
      minute: 23,
      type: "GOAL",
      title: "Gol de Boca",
      description: "⚽ Gol de Miguel Merentiel (asistencia de Pol Fernández). Boca toma ventaja y buscará controlar el ritmo.",
      icon: "⚽",
      team: "home",
      importance: "high"
    },
    {
      id: "4",
      timestamp: Date.now(),
      minute: 47,
      type: "GOAL",
      title: "Gol de River",
      description: "⚽ Empata River! Gol de Ignacio Fernández (asistencia de Manuel Lanzini). El partido se abre.",
      icon: "⚽",
      team: "away",
      importance: "high"
    },
    {
      id: "5",
      timestamp: Date.now(),
      minute: 62,
      type: "GOAL",
      title: "Gol de Boca",
      description: "⚽ Kevin Zenón pone arriba a Boca nuevamente. El equipo busca defender la ventaja.",
      icon: "⚽",
      team: "home",
      importance: "high"
    },
    {
      id: "6",
      timestamp: Date.now(),
      minute: 67,
      type: "SUBSTITUTION",
      title: "Cambio táctico",
      description: "⚡ 67' Cambio: Sale Ignacio Fernández, entra Franco Mastantuono. Movimiento para refrescar el mediocampo.",
      icon: "⚡",
      team: "away",
      importance: "medium"
    },
    {
      id: "7",
      timestamp: Date.now(),
      minute: 75,
      type: "SUBSTITUTION",
      title: "Cambio ofensivo",
      description: "⚡ 75' Último cambio buscando definir: Borja entra por Solari. Gallardo apuesta todo al ataque.",
      icon: "⚡",
      team: "away",
      importance: "high"
    }
  ]
};

// Función para obtener datos mock
export function getMockFixtures(): Match[] {
  return MOCK_MATCHES;
}

export function getMockMatchDetail(fixtureId: number): MatchDetail | null {
  if (fixtureId === 1001) {
    return MOCK_MATCH_DETAIL;
  }
  // Para otros partidos, devolvemos un detalle básico
  const match = MOCK_MATCHES.find(m => m.fixture.id === fixtureId);
  if (match) {
    return { ...match, lineups: undefined, events: [], tacticalInsights: [] };
  }
  return null;
}
