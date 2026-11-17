export default function InfoCard({ title, subtitle, image, onRemove, children }) {
  return (
    <article className="card">
      {image ? (
        <img src={image} alt={title} className="card-img" />
      ) : (
        <div className="card-img card-placeholder">{title.charAt(0)}</div>
      )}
      <div className="card-body">
        <h3>{title}</h3>
        {subtitle && <p className="card-sub">{subtitle}</p>}
        <div className="card-stats">{children}</div>
        {onRemove && (
          <button className="btn-remove" onClick={onRemove}>
            Retirar
          </button>
        )}
      </div>
    </article>
  )
}