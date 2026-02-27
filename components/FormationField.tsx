import { TeamLineup } from "@/types";

interface FormationFieldProps {
  lineup: TeamLineup;
  isHome: boolean;
}

// Parsear posición del grid (ej: "1:1" -> {x: 1, y: 1})
function parseGridPosition(grid: string | null): { x: number; y: number } | null {
  if (!grid) return null;
  const [y, x] = grid.split(":").map(Number);
  if (isNaN(x) || isNaN(y)) return null;
  return { x, y };
}

export function FormationField({ lineup, isHome }: FormationFieldProps) {
  const { team, formation, startXI } = lineup;

  // Grid: 10x7 (ancho x alto)
  // x: 1-10 (izquierda a derecha)
  // y: 1-7 (arriba a abajo)
  // Portero: y=1 (arriba para local, abajo para visitante)

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={team.logo} alt={team.name} className="w-6 h-6 object-contain" />
          <span className="font-semibold text-sm">{team.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{formation}</span>
      </div>

      {/* Campo */}
      <div
        className="relative w-full aspect-[10/7] bg-green-600 rounded-lg overflow-hidden border-4 border-white shadow-inner"
        style={{
          background: "linear-gradient(180deg, #16a34a 0%, #15803d 100%)"
        }}
      >
        {/* Líneas del campo */}
        <div className="absolute inset-0">
          {/* Línea central */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/50" />

          {/* Círculo central */}
          <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 border-2 border-white/50 rounded-full" />

          {/* Punto central */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white/50 rounded-full" />

          {/* Área superior */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/5 border-2 border-white/50 border-t-0" />

          {/* Área inferior */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1/5 border-2 border-white/50 border-b-0" />
        </div>

        {/* Jugadores */}
        {startXI.map(({ player }) => {
          const pos = parseGridPosition(player.grid);
          if (!pos) return null;

          // Para el equipo visitante, invertimos Y
          const displayY = isHome ? pos.y : 8 - pos.y;

          // Convertir a porcentajes
          const left = ((pos.x - 1) / 9) * 100;
          const top = ((displayY - 1) / 6) * 100;

          return (
            <div
              key={player.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* Círculo del jugador */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold text-green-800 border-2 border-green-900">
                {player.number}
              </div>
              {/* Nombre */}
              <span className="mt-1 text-[8px] sm:text-[10px] text-white font-medium text-center leading-tight max-w-[60px] truncate bg-black/30 px-1 rounded">
                {player.name.split(" ").pop()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
