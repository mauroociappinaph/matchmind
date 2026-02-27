import { NextRequest, NextResponse } from "next/server";
import { getFixtures, getLiveFixtures } from "@/lib/api-football";
import { LeagueId } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const live = searchParams.get("live") === "true";
    const leaguesParam = searchParams.get("leagues");

    const leagues = leaguesParam
      ? leaguesParam.split(",").map(Number) as LeagueId[]
      : undefined;

    let matches;

    if (live) {
      matches = await getLiveFixtures(leagues);
    } else {
      matches = await getFixtures(date || undefined, leagues);
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
        error: error instanceof Error ? error.message : "Error al obtener partidos",
        data: []
      },
      { status: 500 }
    );
  }
}
