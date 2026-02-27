import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItem {
  label: string;
  home: number;
  away: number;
}

interface MatchStatisticsProps {
  homeTeam: string;
  awayTeam: string;
  stats: StatItem[];
}

export function MatchStatistics({ homeTeam, awayTeam, stats }: MatchStatisticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          📊 Estadísticas del Partido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => {
          const total = stat.home + stat.away;
          const homePercent = total > 0 ? (stat.home / total) * 100 : 50;
          const awayPercent = total > 0 ? (stat.away / total) * 100 : 50;

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{stat.home}</span>
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="font-semibold">{stat.away}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${homePercent}%` }}
                  />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all"
                    style={{ width: `${awayPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
