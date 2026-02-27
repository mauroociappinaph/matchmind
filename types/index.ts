// Tipos para la API de Football

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
}

export interface Fixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: {
    first: number | null;
    second: number | null;
  };
  venue: {
    id: number | null;
    name: string | null;
    city: string | null;
  };
  status: {
    long: string;
    short: string;
    elapsed: number | null;
    extra: number | null;
  };
}

export interface Goal {
  home: number | null;
  away: number | null;
}

export interface Match {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: Goal;
  score: {
    halftime: Goal;
    fulltime: Goal;
    extratime: Goal;
    penalty: Goal;
  };
}

export interface Player {
  id: number;
  name: string;
  number: number;
  pos: string;
  grid: string | null;
}

export interface TeamLineup {
  team: Team;
  formation: string;
  startXI: { player: Player }[];
  substitutes: { player: Player }[];
  coach: {
    id: number | null;
    name: string;
    photo: string | null;
  };
}

export interface Lineup {
  response: TeamLineup[];
}

export interface MatchEvent {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: Team;
  player: {
    id: number | null;
    name: string | null;
  };
  assist: {
    id: number | null;
    name: string | null;
  };
  type: string;
  detail: string;
  comments: string | null;
}

export interface TacticalInsight {
  id: string;
  timestamp: number;
  minute: number;
  type: 'FORMATION' | 'SUBSTITUTION' | 'GOAL' | 'RED_CARD' | 'YELLOW_CARD' | 'TACTICAL_SHIFT';
  title: string;
  description: string;
  icon: string;
  team: 'home' | 'away';
  importance: 'low' | 'medium' | 'high';
}

export interface MatchDetail extends Match {
  lineups?: Lineup;
  events?: MatchEvent[];
  tacticalInsights?: TacticalInsight[];
}

export type LeagueId = 128 | 39 | 140; // Argentina | Premier | La Liga

export interface LeagueOption {
  id: LeagueId;
  name: string;
  country: string;
  emoji: string;
}
