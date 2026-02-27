import { TacticalInsight } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TACTICAL_COLORS } from "@/lib/constants";

interface TacticalFeedProps {
  insights: TacticalInsight[];
}

export function TacticalFeed({ insights }: TacticalFeedProps) {
  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p className="text-lg mb-2">📝</p>
          <p>No hay análisis táctico disponible todavía.</p>
          <p className="text-sm">Los eventos aparecerán durante el partido.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          🧠 Narrativa Táctica
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {insights.map((insight, index) => (
            <div key={insight.id}>
              <div className="flex gap-4 p-4 hover:bg-muted/50 transition-colors">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${TACTICAL_COLORS[insight.type]}`}>
                    {insight.icon}
                  </div>
                  {index < insights.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">
                      {insight.minute > 0 ? `${insight.minute}'` : 'Inicio'}
                    </span>
                    <Badge
                      variant={insight.importance === 'high' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {insight.type === 'FORMATION' ? 'Formación' :
                       insight.type === 'SUBSTITUTION' ? 'Cambio' :
                       insight.type === 'GOAL' ? 'Gol' :
                       insight.type === 'RED_CARD' ? 'Expulsión' :
                       insight.type === 'YELLOW_CARD' ? 'Amonestación' : 'Táctico'}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
              {index < insights.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
