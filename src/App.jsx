import { useState } from 'react'
import TabBar from './components/TabBar'
import Monsters from './views/Monsters'
import './App.css'

export default function App() {
  const [tab, setTab] = useState('monsters')

  return (
    <div className="shell">
      <header className="top">
        <h1>Taberna del Maestro</h1>
        <p>Tu pantalla de guerra para D&amp;D 5e</p>
      </header>

      <TabBar active={tab} onChange={setTab} />

      <main>
        {tab === 'monsters' && <Monsters />}
        {tab === 'loot' && <p className="msg">Próximamente</p>}
        {tab === 'dice' && <p className="msg">Próximamente</p>}
      </main>

      <footer className="foot">
        <p>Datos de la D&amp;D 5e API</p>
        <p>Hecho por Ian Guatame</p>
      </footer>
    </div>
  )
}