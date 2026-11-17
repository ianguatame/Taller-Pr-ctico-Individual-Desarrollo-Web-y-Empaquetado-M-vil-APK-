// Entero aleatorio entre min y max, ambos incluidos
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Devuelve n elementos al azar de una lista
export function sample(list, n) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, n)
}