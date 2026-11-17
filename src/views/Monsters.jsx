import { useEffect, useState } from 'react'
import { listarMonstruos, detalleMonstruo, urlImagen } from '../api/dnd'
import InfoCard from '../components/InfoCard'
import StatBox from '../components/StatBox'

const FRACCIONES = { 0.125: '1/8', 0.25: '1/4', 0.5: '1/2' }

export default function Monsters() {
  const [catalogo, setCatalogo] = useState([])
  const [texto, setTexto] = useState('')
  const [mesa, setMesa] = useState([])
  const [cargando, setCargando] = useState(true)
  const [invocando, setInvocando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    listarMonstruos()
      .then(setCatalogo)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false))
  }, [])

  async function invocar(index) {
    setInvocando(true)
    setError('')
    try {
      const data = await detalleMonstruo(index)
      setMesa((actual) => [...actual, { ...data, uid: Date.now() + Math.random() }])
    } catch (e) {
      setError(e.message)
    } finally {
      setInvocando(false)
    }
  }

  function retirar(uid) {
    setMesa((actual) => actual.filter((m) => m.uid !== uid))
  }

  const visibles = catalogo.filter((m) =>
    m.name.toLowerCase().includes(texto.toLowerCase())
  )

  return (
    <section className="view">
      <h2>Criaturas</h2>
      <p className="hint">Busca una criatura y tócala para sumarla al encuentro.</p>

      <input
        className="search"
        placeholder="Buscar por nombre..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      {cargando && <p className="msg">Cargando catálogo...</p>}
      {error && <p className="msg error">{error}</p>}

      {!cargando && (
        <>
          <p className="hint">{visibles.length} resultados</p>
          <div className="picker">
            {visibles.map((m) => (
              <button
                key={m.index}
                className="picker-item"
                disabled={invocando}
                onClick={() => invocar(m.index)}
              >
                {m.name} <span>+</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="row-between">
        <h3>Encuentro actual ({mesa.length})</h3>
        {mesa.length > 0 && (
          <button className="btn-ghost" onClick={() => setMesa([])}>
            Vaciar
          </button>
        )}
      </div>

      {invocando && <p className="msg">Invocando...</p>}
      {mesa.length === 0 && !invocando && (
        <p className="msg">Aún no hay criaturas en el encuentro.</p>
      )}

      <div className="grid">
        {mesa.map((m) => (
          <InfoCard
            key={m.uid}
            title={m.name}
            subtitle={`${m.size} · ${m.type}`}
            image={urlImagen(m.image)}
            onRemove={() => retirar(m.uid)}
          >
            <StatBox label="Armadura" value={m.armor_class?.[0]?.value ?? '—'} />
            <StatBox label="Vida" value={m.hit_points} />
            <StatBox
              label="Desafío"
              value={FRACCIONES[m.challenge_rating] ?? m.challenge_rating}
            />
          </InfoCard>
        ))}
      </div>
    </section>
  )
}