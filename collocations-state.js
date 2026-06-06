// ── Estado del juego ───────────────────────────────────────────────────────
const GAME = {
  order: [],             // orden barajado de índices de activePhrases
  orderPos: 0,           // posición actual dentro del orden
  activePhrases: [],     // frases del nivel seleccionado (filtradas)
  difficulty: 'med',     // nivel de dificultad activo
  xpMultiplier: 1.5,     // multiplicador XP según dificultad
  totalPoints: 0,        // puntos acumulados de la sesión
  roundPoints: 0,        // puntos esta ronda (frase actual)
  record: 0,             // récord de puntos en una ronda
  energy: 15,            // energía
  streak: 0,             // racha de aciertos seguidos
  combo: 1,
  totalAttempts: 0,
  totalCorrect: 0,
  masteryDone: 0,
  startTime: Date.now(),
  filledSlots: {},
  usedChips: new Set(),
  completedRound: false,
  pendingXp: 0,
  xpSessionEarned: 0,
  xpBaseline: null
};
