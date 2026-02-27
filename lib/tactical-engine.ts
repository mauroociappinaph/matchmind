import { MatchEvent, TacticalInsight, Lineup, TeamLineup } from "@/types";
import { TACTICAL_ICONS } from "./constants";

// Generar insights tácticos a partir de eventos y formaciones
export function generateTacticalInsights(
  events: MatchEvent[],
  lineups: Lineup | null
): TacticalInsight[] {
  const insights: TacticalInsight[] = [];

  // Analizar eventos
  events.forEach((event) => {
    const insight = analyzeEvent(event);
    if (insight) {
      insights.push(insight);
    }
  });

  // Analizar formación inicial
  if (lineups && lineups.response) {
    lineups.response.forEach((teamLineup, index) => {
      const formationInsight = analyzeFormation(teamLineup, index === 0 ? "home" : "away");
      if (formationInsight) {
        insights.unshift(formationInsight); // Al principio
      }
    });
  }

  // Ordenar por minuto
  return insights.sort((a, b) => a.minute - b.minute);
}

// Analizar un evento específico
function analyzeEvent(event: MatchEvent): TacticalInsight | null {
  const { type, detail, time, team } = event;
  const teamSide = team.name; // Se determinará después

  // Sustitución
  if (type === "subst") {
    return {
      id: `sub-${time.elapsed}-${event.player.id}`,
      timestamp: Date.now(),
      minute: time.elapsed,
      type: "SUBSTITUTION",
      title: "Cambio táctico",
      description: generateSubstitutionDescription(event),
      icon: TACTICAL_ICONS.SUBSTITUTION,
      team: "home", // Se determina dinámicamente
      importance: calculateSubstitutionImportance(event),
    };
  }

  // Tarjeta roja
  if (detail === "Red Card") {
    return {
      id: `red-${time.elapsed}-${event.player.id}`,
      timestamp: Date.now(),
      minute: time.elapsed,
      type: "RED_CARD",
      title: "Expulsión",
      description: `🟥 ${event.player.name} expulsado. El equipo deberá replegarse y probablemente cambie su esquema táctico.`,
      icon: TACTICAL_ICONS.RED_CARD,
      team: "home",
      importance: "high",
    };
  }

  // Tarjeta amarilla (si es doble)
  if (detail === "Second Yellow card") {
    return {
      id: `yellow2-${time.elapsed}-${event.player.id}`,
      timestamp: Date.now(),
      minute: time.elapsed,
      type: "RED_CARD",
      title: "Doble amarilla",
      description: `🟨🟥 ${event.player.name} se va expulsado por doble amonestación. El equipo se queda con 10.`,
      icon: TACTICAL_ICONS.RED_CARD,
      team: "home",
      importance: "high",
    };
  }

  // Gol
  if (type === "Goal") {
    const isPenalty = detail === "Penalty";
    const isOwnGoal = detail === "Own Goal";

    return {
      id: `goal-${time.elapsed}-${event.player.id}`,
      timestamp: Date.now(),
      minute: time.elapsed,
      type: "GOAL",
      title: isPenalty ? "Gol de penal" : isOwnGoal ? "Gol en contra" : "Gol",
      description: generateGoalDescription(event, isPenalty, isOwnGoal),
      icon: TACTICAL_ICONS.GOAL,
      team: "home",
      importance: "high",
    };
  }

  return null;
}

// Generar descripción de sustitución
function generateSubstitutionDescription(event: MatchEvent): string {
  const { player, assist, time } = event;
  const minute = time.elapsed;

  let description = `⚡ ${minute}' Cambio: Sale ${player.name}`;

  if (assist.name) {
    description += `, entra ${assist.name}`;
  }

  // Contexto táctico según el momento
  if (minute < 45) {
    description += ". Ajuste temprano del entrenador, buscando corregir el rendimiento.";
  } else if (minute < 60) {
    description += ". Cambio en el entretiempo o inicio de segundo tiempo.";
  } else if (minute < 75) {
    description += ". Movimiento para refrescar el equipo.";
  } else {
    description += ". Último cambio buscando definir el partido.";
  }

  return description;
}

// Calcular importancia de una sustitución
function calculateSubstitutionImportance(event: MatchEvent): "low" | "medium" | "high" {
  const { time } = event;

  if (time.elapsed > 80) return "high";
  if (time.elapsed > 60) return "medium";
  if (time.elapsed < 30) return "high"; // Cambio temprano = problema o táctica especial
  return "low";
}

// Generar descripción de gol
function generateGoalDescription(event: MatchEvent, isPenalty: boolean, isOwnGoal: boolean): string {
  const { player, assist } = event;

  if (isPenalty) {
    return `⚽ ${player.name} convierte el penal. Ventaja en el marcador.`;
  }

  if (isOwnGoal) {
    return `⚽ Gol en contra de ${player.name}. Mala suerte defensiva.`;
  }

  let description = `⚽ Gol de ${player.name}`;

  if (assist.name) {
    description += ` (asistencia de ${assist.name})`;
  }

  description += ". El equipo toma ventaja y probablemente busque controlar el ritmo.";

  return description;
}

// Analizar formación inicial
function analyzeFormation(teamLineup: TeamLineup, side: "home" | "away"): TacticalInsight | null {
  if (!teamLineup.formation) return null;

  const formation = teamLineup.formation;
  const teamName = teamLineup.team.name;

  // Analizar según formación
  let tacticalApproach = "";

  if (formation.startsWith("4-3-3")) {
    tacticalApproach = "enfoque ofensivo con bandas, buscando amplitud";
  } else if (formation.startsWith("4-4-2")) {
    tacticalApproach = "equilibrio entre defensa y ataque, clásico 4-4-2";
  } else if (formation.startsWith("4-5-1") || formation.startsWith("5-4-1")) {
    tacticalApproach = "esquema más defensivo, priorizando el bloque bajo";
  } else if (formation.startsWith("3-")) {
    tacticalApproach = "línea de 3 defensores, buscando superioridad en el mediocampo";
  } else if (formation.startsWith("4-2-3-1")) {
    tacticalApproach = "formación moderna con enganche, equilibrio y creatividad";
  } else {
    tacticalApproach = `formación ${formation}`;
  }

  return {
    id: `formation-${side}`,
    timestamp: Date.now(),
    minute: 0,
    type: "FORMATION",
    title: `Alineación ${teamName}`,
    description: `🔄 ${teamName} sale con ${formation}: ${tacticalApproach}.`,
    icon: TACTICAL_ICONS.FORMATION,
    team: side,
    importance: "medium",
  };
}

// Detectar cambio de formación (entre dos snapshots)
export function detectFormationChange(
  previousFormation: string,
  newFormation: string,
  minute: number,
  team: "home" | "away",
  teamName: string
): TacticalInsight | null {
  if (previousFormation === newFormation) return null;

  const defendersBefore = parseInt(previousFormation.split("-")[0]) || 4;
  const defendersAfter = parseInt(newFormation.split("-")[0]) || 4;

  let tacticalShift = "";

  if (defendersAfter > defendersBefore) {
    tacticalShift = "más defensivo";
  } else if (defendersAfter < defendersBefore) {
    tacticalShift = "más ofensivo";
  } else {
    tacticalShift = "ajuste táctico en el mediocampo";
  }

  return {
    id: `formation-change-${minute}`,
    timestamp: Date.now(),
    minute,
    type: "FORMATION",
    title: "Cambio de formación",
    description: `🔄 ${teamName} cambia de ${previousFormation} a ${newFormation}: enfoque ${tacticalShift}.`,
    icon: TACTICAL_ICONS.FORMATION,
    team,
    importance: "high",
  };
}
