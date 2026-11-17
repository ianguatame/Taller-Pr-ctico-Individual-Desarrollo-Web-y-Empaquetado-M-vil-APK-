const BASE = 'https://www.dnd5eapi.co'

async function pedir(ruta) {
  const res = await fetch(`${BASE}${ruta}`)
  if (!res.ok) {
    throw new Error(`Error ${res.status} al consultar la API`)
  }
  return res.json()
}

export async function listarMonstruos() {
  const data = await pedir('/api/monsters')
  return data.results
}

export function detalleMonstruo(index) {
  return pedir(`/api/monsters/${index}`)
}

export async function listarEndpoint(nombre) {
  const data = await pedir(`/api/${nombre}`)
  return data.results
}

export function detalleDesdeUrl(url) {
  return pedir(url)
}

export function urlImagen(ruta) {
  return ruta ? `${BASE}${ruta}` : null
}