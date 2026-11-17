export default function CoinBadge({ label, amount, kind }) {
  return (
    <div className="coin">
      <span className={`coin-dot ${kind}`}></span>
      <strong>{amount}</strong>
      <small>{label}</small>
    </div>
  )
}