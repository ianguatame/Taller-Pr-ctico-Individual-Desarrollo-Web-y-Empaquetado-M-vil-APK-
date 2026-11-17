import { useState } from 'react'
import { randInt } from '../helpers/random'

const DICE = [4, 6, 8, 10, 12, 20, 100]
const MAX_QTY = 10

export default function Dice() {
  const [sides, setSides] = useState(20)
  const [qty, setQty] = useState(1)
  const [last, setLast] = useState(null)
  const [log, setLog] = useState([])

  function changeQty(delta) {
    setQty((q) => Math.min(MAX_QTY, Math.max(1, q + delta)))
  }

  function roll() {
    const rolls = Array.from({ length: qty }, () => randInt(1, sides))
    const total = rolls.reduce((a, b) => a + b, 0)
    const entry = { id: Date.now(), label: `${qty}d${sides}`, rolls, total, sides, qty }
    setLast(entry)
    setLog((prev) => [entry, ...prev].slice(0, 8))
  }

  const singleD20 = last && last.sides === 20 && last.qty === 1
  const crit = singleD20 && last.total === 20
  const fumble = singleD20 && last.total === 1

  let resultClass = 'result'
  if (crit) resultClass += ' crit'
  if (fumble) resultClass += ' fumble'

  return (
    <section className="view">
      <h2>Dados</h2>
      <p className="hint">Elige el dado, cuántos lanzar y deja que el destino decida.</p>

      <div className="dice-grid">
        {DICE.map((n) => (
          <button
            key={n}
            className={sides === n ? 'die on' : 'die'}
            onClick={() => setSides(n)}
          >
            d{n}
          </button>
        ))}
      </div>

      <div className="qty">
        <button onClick={() => changeQty(-1)} disabled={qty === 1}>
          −
        </button>
        <span>{qty}</span>
        <button onClick={() => changeQty(1)} disabled={qty === MAX_QTY}>
          +
        </button>
      </div>

      <button className="btn-main" onClick={roll}>
        Lanzar {qty}d{sides}
      </button>

      <div className="tray">
        {last === null ? (
          <p className="msg">La bandeja espera tu primer lanzamiento.</p>
        ) : (
          <>
            <span key={last.id} className={resultClass}>
              {last.total}
            </span>
            {crit && <p className="flag good">¡Crítico!</p>}
            {fumble && <p className="flag bad">¡Pifia!</p>}
            {last.rolls.length > 1 && <p className="hint">{last.rolls.join(' + ')}</p>}
          </>
        )}
      </div>

      {log.length > 0 && (
        <>
          <h3>Historial</h3>
          <ul className="log">
            {log.map((e) => (
              <li key={e.id}>
                <span>{e.label}</span>
                <strong>{e.total}</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}