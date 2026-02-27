import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LEAGUE_OPTIONS } from "@/lib/constants";
import { LeagueId } from "@/types";

interface LeagueFilterProps {
  selectedLeagues: LeagueId[];
  onChange: (leagues: LeagueId[]) => void;
}

export function LeagueFilter({ selectedLeagues, onChange }: LeagueFilterProps) {
  const handleChange = (value: string) => {
    if (value === "all") {
      onChange(LEAGUE_OPTIONS.map((l) => l.id));
    } else {
      onChange([Number(value) as LeagueId]);
    }
  };

  const currentValue = selectedLeagues.length === LEAGUE_OPTIONS.length ? "all" : selectedLeagues[0]?.toString() || "all";

  return (
    <Tabs value={currentValue} onValueChange={handleChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">Todas</TabsTrigger>
        {LEAGUE_OPTIONS.map((league) => (
          <TabsTrigger key={league.id} value={league.id.toString()}>
            <span className="mr-1">{league.emoji}</span>
            <span className="hidden sm:inline">{league.country}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
