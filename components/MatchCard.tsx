import { Match } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MATCH_STATUS } from "@/lib/constants";
import Link from "next/link";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const { fixture, teams, goals, league } = match;
  const isLive = fixture.status.short === "L1" || fixture.status.short === "L2" || fixture.status.short === "HT";
  const isFinished = fixture.status.short === "FT";
  const statusText = MATCH_STATUS[fixture.status.short as keyof typeof MATCH_STATUS] || fixture.status.long;

  return (
    <Link href={`/match/${fixture.id}`}>
      <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${isLive ? 'border-green-500 border-2' : ''}`}>
        <CardContent className="p-4">
          {/* Header: Liga y Estado */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-lg">{league.flag}</span>
              <span className="truncate max-w-[150px]">{league.name}</span>
            </div>
            {isLive ? (
              <Badge variant="default" className="bg-green-500 animate-pulse">
                {fixture.status.elapsed}'
              </Badge>
            ) : (
              <Badge variant={isFinished ? "secondary" : "outline"}>
                {statusText}
              </Badge>
            )}
          </div>

          {/* Equipos y Marcador */}
          <div className="flex items-center justify-between">
            {/* Equipo Local */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <img
                src={teams.home.logo}
                alt={teams.home.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm font-medium text-center line-clamp-2">
                {teams.home.name}
              </span>
            </div>

            {/* Marcador */}
            <div className="flex flex-col items-center px-4">
              <div className="text-3xl font-bold">
                {goals.home ?? "-"} : {goals.away ?? "-"}
              </div>
              {isLive && (
                <span className="text-xs text-green-600 font-medium mt-1">
                  EN VIVO
                </span>
              )}
            </div>

            {/* Equipo Visitante */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <img
                src={teams.away.logo}
                alt={teams.away.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm font-medium text-center line-clamp-2">
                {teams.away.name}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
