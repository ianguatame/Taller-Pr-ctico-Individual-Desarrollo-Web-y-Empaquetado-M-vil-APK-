const TABS = [
  { id: 'monsters', label: 'Criaturas' },
  { id: 'loot', label: 'Tesoro' },
  { id: 'dice', label: 'Dados' },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="tabbar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={active === tab.id ? 'tab on' : 'tab'}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}