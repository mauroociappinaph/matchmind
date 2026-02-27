"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MatchDetail } from "@/types";
import { TacticalFeed } from "@/components/TacticalFeed";
import { FormationField } from "@/components/FormationField";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MATCH_STATUS } from "@/lib/constants";

export default function MatchPage() {
  const params = useParams();
  const matchId = params.id as string;

  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatchDetail() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/match/${matchId}`);
        const data = await response.json();

        if (data.success) {
          setMatch(data.data);
        } else {
          setError(data.error || "Error al cargar el partido");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    }

    if (matchId) {
      fetchMatchDetail();
    }
  }, [matchId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !match) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-lg text-red-500">{error || "Partido no encontrado"}</p>
          <Link href="/">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const { fixture, teams, goals, league, lineups, tacticalInsights } = match;
  const isLive = fixture.status.short === "L1" || fixture.status.short === "L2" || fixture.status.short === "HT";
  const statusText = MATCH_STATUS[fixture.status.short as keyof typeof MATCH_STATUS] || fixture.status.long;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Detalle del Partido</h1>
              <p className="text-sm text-muted-foreground">{league.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Marcador */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {/* Equipo Local */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <img
                  src={teams.home.logo}
                  alt={teams.home.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="font-semibold text-center">
                  {teams.home.name}
                </span>
              </div>

              {/* Marcador y Estado */}
              <div className="flex flex-col items-center px-6">
                <div className="text-4xl font-bold mb-2">
                  {goals.home ?? "-"} : {goals.away ?? "-"}
                </div>
                {isLive ? (
                  <Badge className="bg-green-500 animate-pulse">
                    {fixture.status.elapsed}'
                  </Badge>
                ) : (
                  <Badge variant="outline">{statusText}</Badge>
                )}
              </div>

              {/* Equipo Visitante */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <img
                  src={teams.away.logo}
                  alt={teams.away.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="font-semibold text-center">
                  {teams.away.name}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda: Formaciones */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">📋 Formaciones</h2>

            {lineups && lineups.response && lineups.response.length > 0 ? (
              <div className="space-y-6">
                {lineups.response.map((teamLineup, index) => (
                  <FormationField
                    key={teamLineup.team.id}
                    lineup={teamLineup}
                    isHome={index === 0}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  <p>Formaciones no disponibles</p>
                  <p className="text-sm">Las alineaciones se muestran cerca del inicio del partido</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Columna derecha: Narrativa Táctica */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">🧠 Análisis Táctico</h2>
            <TacticalFeed insights={tacticalInsights || []} />
          </div>
        </div>
      </div>
    </main>
  );
}
