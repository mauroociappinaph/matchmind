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

    console.log("[API] Request params:", { date, live, leagues });

    let matches;

    if (live) {
      matches = await getLiveFixtures(leagues);
    } else {
      matches = await getFixtures(date || undefined, leagues);
    }

    console.log("[API] Matches found:", matches.length);
    if (matches.length > 0) {
      console.log("[API] First match:", JSON.stringify(matches[0]).slice(0, 200));
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
