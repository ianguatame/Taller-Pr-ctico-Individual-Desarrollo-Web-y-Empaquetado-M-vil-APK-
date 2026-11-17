import { useEffect, useState } from 'react'
import { listarEndpoint, detalleDesdeUrl, urlImagen } from '../api/dnd'
import InfoCard from '../components/InfoCard'
import StatBox from '../components/StatBox'
import CoinBadge from '../components/CoinBadge'
import { sample } from '../helpers/random'
import {
  CR_STEPS,
  formatCR,
  tierName,
  rollCoins,
  itemPlan,
  allowedRarities,
  goldValue,
} from '../helpers/loot'

export default function Loot() {
  const [paso, setPaso] = useState(4) // posición en CR_STEPS (CR 1)
  const [equipo, setEquipo] = useState([])
  const [magicos, setMagicos] = useState([])
  const [coins, setCoins] = useState(null)
  const [items, setItems] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const cr = CR_STEPS[paso]
  const listo = equipo.length > 0 && magicos.length > 0

  useEffect(() => {
    listarEndpoint('equipment').then(setEquipo).catch((e) => setError(e.message))
    listarEndpoint('magic-items').then(setMagicos).catch((e) => setError(e.message))
  }, [])

  async function generar() {
    setBusy(true)
    setError('')
    setItems([])
    setCoins(rollCoins(cr))

    try {
      const plan = itemPlan(cr)

      // Objetos comunes: se eligen al azar y se pide su detalle en paralelo
      const comunes = await Promise.all(
        sample(equipo, plan.common).map((e) => detalleDesdeUrl(e.url))
      )

      // Objetos mágicos: se piden varios candidatos y se prefieren
      // los que tengan una rareza acorde al desafío
      let magicosElegidos = []
      if (plan.magic > 0) {
        const candidatos = await Promise.all(
          sample(magicos, 10).map((m) => detalleDesdeUrl(m.url))
        )
        const permitidas = allowedRarities(cr)
        const buenos = candidatos.filter((c) => permitidas.includes(c.rarity?.name))
        const resto = candidatos.filter((c) => !buenos.includes(c))
        magicosElegidos = [...buenos, ...resto].slice(0, plan.magic)
      }

      setItems([...comunes, ...magicosElegidos])
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="view">
      <h2>Tesoro</h2>
      <p className="hint">Elige el desafío de la criatura vencida y abre el cofre.</p>

      <div className="slider-box">
        <label htmlFor="cr">
          Nivel de desafío: <strong>{formatCR(cr)}</strong>
        </label>
        <input
          id="cr"
          type="range"
          min="0"
          max={CR_STEPS.length - 1}
          value={paso}
          onChange={(e) => setPaso(Number(e.target.value))}
        />
        <p className="tier">{tierName(cr)}</p>
      </div>

      <button className="btn-main" onClick={generar} disabled={busy || !listo}>
        {busy ? 'Abriendo el cofre...' : 'Abrir cofre'}
      </button>

      {!listo && !error && <p className="msg">Cargando objetos de la API...</p>}
      {error && <p className="msg error">{error}</p>}

      {coins && (
        <>
          <h3>Monedas</h3>
          <div className="coins">
            <CoinBadge label="Cobre" amount={coins.cp} kind="cp" />
            <CoinBadge label="Plata" amount={coins.sp} kind="sp" />
            <CoinBadge label="Oro" amount={coins.gp} kind="gp" />
            <CoinBadge label="Platino" amount={coins.pp} kind="pp" />
          </div>
          <p className="total">
            Valor total: <strong>{goldValue(coins)} po</strong>
          </p>
        </>
      )}

      {items.length > 0 && <h3>Objetos</h3>}

      <div className="grid">
        {items.map((item, i) => (
          <InfoCard
            key={`${item.index}-${i}`}
            title={item.name}
            subtitle={item.equipment_category?.name}
            image={urlImagen(item.image)}
          >
            {item.rarity ? (
              <StatBox label="Rareza" value={item.rarity.name} />
            ) : (
              <StatBox
                label="Valor"
                value={item.cost ? `${item.cost.quantity} ${item.cost.unit}` : '—'}
              />
            )}
            <StatBox label="Tipo" value={item.rarity ? 'Mágico' : 'Común'} />
            <StatBox label="Peso" value={item.weight ? `${item.weight} lb` : '—'} />
          </InfoCard>
        ))}
      </div>
    </section>
  )
}