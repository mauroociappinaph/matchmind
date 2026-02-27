import { NextRequest, NextResponse } from "next/server";
import { getMatchDetail, getMatchLineups, getMatchEvents } from "@/lib/api-football";
import { generateTacticalInsights } from "@/lib/tactical-engine";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const matchId = Number(params.id);

    if (isNaN(matchId)) {
      return NextResponse.json(
        { success: false, error: "ID de partido inválido" },
        { status: 400 }
      );
    }

    // Obtener datos del partido en paralelo
    const [match, lineups, events] = await Promise.all([
      getMatchDetail(matchId),
      getMatchLineups(matchId),
      getMatchEvents(matchId),
    ]);

    if (!match) {
      return NextResponse.json(
        { success: false, error: "Partido no encontrado" },
        { status: 404 }
      );
    }

    // Generar insights tácticos
    const tacticalInsights = generateTacticalInsights(events || [], lineups);

    return NextResponse.json({
      success: true,
      data: {
        ...match,
        lineups,
        events,
        tacticalInsights,
      },
    });
  } catch (error) {
    console.error("Error fetching match detail:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener detalle del partido" },
      { status: 500 }
    );
  }
}
