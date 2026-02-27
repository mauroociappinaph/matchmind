import { NextRequest, NextResponse } from "next/server";
import { getMockMatchDetail } from "@/lib/mock-data";
import { generateTacticalInsights } from "@/lib/tactical-engine";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const matchId = Number(id);

    if (isNaN(matchId)) {
      return NextResponse.json(
        { success: false, error: "ID de partido inválido" },
        { status: 400 }
      );
    }

    // Obtener datos mock del partido
    const match = getMockMatchDetail(matchId);

    if (!match) {
      return NextResponse.json(
        { success: false, error: "Partido no encontrado" },
        { status: 404 }
      );
    }

    // Generar insights tácticos si no existen
    const tacticalInsights = match.tacticalInsights ||
      generateTacticalInsights(match.events || [], match.lineups || null);

    return NextResponse.json({
      success: true,
      data: {
        ...match,
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
