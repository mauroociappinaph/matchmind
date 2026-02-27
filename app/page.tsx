"use client";

import { useEffect, useState } from "react";
import { MatchCard } from "@/components/MatchCard";
import { LeagueFilter } from "@/components/LeagueFilter";
import { Match, LeagueId } from "@/types";
import { LEAGUES } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeagues, setSelectedLeagues] = useState<LeagueId[]>([
    LEAGUES.ARGENTINA,
    LEAGUES.PREMIER,
    LEAGUES.LA_LIGA,
  ]);
  const [viewMode, setViewMode] = useState<"all" | "live">("all");

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const url = new URL("/api/fixtures", window.location.origin);
        url.searchParams.set("leagues", selectedLeagues.join(","));

        if (viewMode === "live") {
          url.searchParams.set("live", "true");
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        if (data.success) {
          setMatches(data.data);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();

    // Refrescar cada 60 segundos si estamos viendo partidos en vivo
    const interval = viewMode === "live" ? setInterval(fetchMatches, 60000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedLeagues, viewMode]);

  const liveMatches = matches.filter(
    (m) => m.fixture.status.short === "L1" || m.fixture.status.short === "L2" || m.fixture.status.short === "HT"
  );

  const upcomingMatches = matches.filter(
    (m) => m.fixture.status.short === "NS"
  );

  const finishedMatches = matches.filter(
    (m) => m.fixture.status.short === "FT"
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                ⚽ MatchMind
              </h1>
              <span className="text-sm text-muted-foreground">
                Narrativa Táctica
              </span>
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <LeagueFilter
                selectedLeagues={selectedLeagues}
                onChange={setSelectedLeagues}
              />
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "all" | "live")}>
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="live">
                    🟢 En Vivo ({liveMatches.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No hay partidos disponibles
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Intenta cambiar los filtros de ligas
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* En Vivo */}
            {(viewMode === "live" || (viewMode === "all" && liveMatches.length > 0)) && liveMatches.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🟢 En Vivo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {liveMatches.map((match) => (
                    <MatchCard key={match.fixture.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {/* Próximos */}
            {viewMode === "all" && upcomingMatches.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4">⏳ Próximos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingMatches.map((match) => (
                    <MatchCard key={match.fixture.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {/* Finalizados */}
            {viewMode === "all" && finishedMatches.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4">✅ Finalizados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {finishedMatches.map((match) => (
                    <MatchCard key={match.fixture.id} match={match} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
