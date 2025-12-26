interface Props {
  label: string
  value: number | string
}

export default function StatCard({ label, value }: Props) {
  return (
    <div className="stat-card">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  )
}
