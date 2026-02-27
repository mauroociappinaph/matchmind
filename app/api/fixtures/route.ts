import { NextRequest, NextResponse } from "next/server";
import { getMockFixtures } from "@/lib/mock-data";
import { LeagueId } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const live = searchParams.get("live") === "true";
    const leaguesParam = searchParams.get("leagues");

    const leagues = leaguesParam
      ? leaguesParam.split(",").map(Number) as LeagueId[]
      : undefined;

    // Usar datos de ejemplo (mock) en lugar de la API real
    const allMatches = getMockFixtures();

    // Filtrar por ligas si se especificaron
    let matches = allMatches;
    if (leagues && leagues.length > 0) {
      matches = allMatches.filter(m => leagues.includes(m.league.id as LeagueId));
    }

    // Si es modo live, filtrar solo partidos en vivo
    if (live) {
      matches = matches.filter(m =>
        m.fixture.status.short === "L1" ||
        m.fixture.status.short === "L2" ||
        m.fixture.status.short === "HT"
      );
    }

    return NextResponse.json({
      success: true,
      data: matches,
      count: matches.length
    });
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener partidos",
        data: []
      },
      { status: 500 }
    );
  }
}
