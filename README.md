# ⚽ MatchMind

Narrativa táctica en vivo para partidos de fútbol. Análisis inteligente de formaciones, cambios tácticos y eventos del partido.

![MatchMind](https://img.shields.io/badge/MatchMind-Narrativa%20Táctica-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![API-Football](https://img.shields.io/badge/API--Football-Free-orange)

## 🎯 Características

- **📊 Dashboard de Partidos**: Visualización de partidos en vivo, próximos y finalizados
- **🏟️ Formaciones Visuales**: Campo de fútbol con jugadores posicionados
- **🧠 Narrativa Táctica**: Análisis automático de cambios tácticos sin IA paga
- **⚡ En Vivo**: Actualización en tiempo real de eventos
- **🌍 Ligas Soportadas**:
  - 🇦🇷 Primera División Argentina
  - 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League
  - 🇪🇸 La Liga

## 🚀 Demo

Visita la app en: [https://matchmind.vercel.app](https://matchmind.vercel.app) *(próximamente)*

## 🛠️ Tecnologías

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **UI Components**: shadcn/ui
- **API**: API-Football (plan gratuito)
- **Motor Táctico**: Reglas heurísticas (sin costos de IA)
- **Deploy**: Vercel (gratis)

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/mauroociappinaph/matchmind.git
cd matchmind
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.local.example .env.local
```

Edita `.env.local` y agrega tu API key de API-Football:
```
FOOTBALL_API_KEY=tu_api_key_aqui
```

4. **Obtener API Key (Gratis)**
   - Ve a [api-football.com](https://www.api-football.com/)
   - Regístrate gratis
   - Copia tu API key del dashboard

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
matchmind/
├── app/
│   ├── api/
│   │   ├── fixtures/route.ts      # API: lista de partidos
│   │   └── match/[id]/route.ts    # API: detalle de partido
│   ├── match/[id]/page.tsx        # Página: detalle del partido
│   ├── layout.tsx                 # Layout raíz
│   └── page.tsx                   # Página: dashboard
├── components/
│   ├── MatchCard.tsx              # Card de partido
│   ├── LeagueFilter.tsx           # Filtro de ligas
│   ├── FormationField.tsx         # Campo con formaciones
│   └── TacticalFeed.tsx           # Feed de narrativa táctica
├── lib/
│   ├── api-football.ts            # Cliente API-Football
│   ├── tactical-engine.ts         # Motor de narrativa
│   └── constants.ts               # Constantes y configuración
├── types/
│   └── index.ts                   # Tipos TypeScript
└── README.md
```

## 🧠 Motor Táctico

El motor genera narrativas tácticas sin usar IA paga:

### Tipos de Análisis

| Evento | Descripción |
|--------|-------------|
| 🔄 **Formación** | Análisis de esquema (4-3-3, 4-4-2, etc.) |
| ⚡ **Sustitución** | Contexto del cambio según minuto |
| ⚽ **Gol** | Impacto táctico del gol |
| 🟥 **Expulsión** | Análisis de cómo afecta el esquema |

### Ejemplos de Narrativas

```
🔄 "Boca sale con 4-3-3: enfoque ofensivo con bandas"
⚡ "75' Cambio: Sale Varela, entra Rolón. Último cambio buscando definir"
🟥 "Expulsión! River deberá replegarse y probablemente cambie a 4-4-1"
```

## 💰 Costos

| Servicio | Costo | Límite |
|----------|-------|--------|
| API-Football | **$0** | 100 requests/día |
| Vercel | **$0** | Ilimitado (hobby) |
| Next.js | **$0** | Open source |
| **Total** | **$0** | |

## 🚧 Roadmap

### MVP (Actual) ✅
- [x] Dashboard con filtros
- [x] Detalle de partidos
- [x] Formaciones visuales
- [x] Narrativa táctica básica
- [x] Soporte 3 ligas

### Fase 2 (Próxima)
- [ ] Estadísticas avanzadas
- [ ] Comparación histórica entre equipos
- [ ] Modo oscuro
- [ ] PWA (instalable en móvil)

### Fase 3 (Futuro)
- [ ] Predicciones tácticas con IA
- [ ] Análisis post-partido
- [ ] Alertas personalizadas
- [ ] Soporte para más ligas

## 🤝 Contribuir

1. Fork el repositorio
2. Crea tu feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - Libre para usar y modificar

## 🙏 Agradecimientos

- [API-Football](https://www.api-football.com/) por la API gratuita
- [shadcn/ui](https://ui.shadcn.com/) por los componentes UI
- [Vercel](https://vercel.com/) por el hosting gratuito

---

**⚽ Hecho con pasión por el fútbol y el código**
