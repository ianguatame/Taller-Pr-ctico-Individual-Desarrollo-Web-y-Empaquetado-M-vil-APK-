import { randInt } from './random'

export const CR_STEPS = [0, 0.125, 0.25, 0.5, ...Array.from({ length: 30 }, (_, i) => i + 1)]

const FRACTIONS = { 0.125: '1/8', 0.25: '1/4', 0.5: '1/2' }

export function formatCR(cr) {
  return FRACTIONS[cr] ?? cr
}

export function tierName(cr) {
  if (cr < 5) return 'Botín humilde'
  if (cr < 11) return 'Botín notable'
  if (cr < 17) return 'Botín valioso'
  return 'Botín legendario'
}

// Las monedas crecen con el desafío y las más valiosas aparecen en niveles altos
export function rollCoins(cr) {
  const escala = Math.max(1, Math.ceil(cr))
  return {
    cp: cr < 5 ? randInt(20, 100) : 0,
    sp: cr < 11 ? randInt(10, 40) * escala : 0,
    gp: randInt(5, 15) * escala,
    pp: cr >= 11 ? randInt(1, 5) * Math.floor(cr / 2) : 0,
  }
}

// Cuántos objetos comunes y mágicos se entregan
export function itemPlan(cr) {
  if (cr < 5) return { common: 2, magic: 0 }
  if (cr < 11) return { common: 1, magic: 1 }
  if (cr < 17) return { common: 1, magic: 2 }
  return { common: 0, magic: 3 }
}

// Rarezas permitidas para los objetos mágicos según el desafío
export function allowedRarities(cr) {
  if (cr < 5) return ['Common', 'Uncommon']
  if (cr < 11) return ['Uncommon', 'Rare']
  if (cr < 17) return ['Rare', 'Very Rare']
  return ['Very Rare', 'Legendary']
}

export function goldValue({ cp, sp, gp, pp }) {
  return Math.round((gp + pp * 10 + sp / 10 + cp / 100) * 100) / 100
}