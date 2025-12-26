import StatCard from '../components/StatCard'
import { courses } from '../data/courses'
import '../styles/dashboard.css'

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const recommended = courses.filter(c => user.interests?.includes(c.tag))

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}</h2>
      <div className="stats">
        <StatCard label="Interests" value={user.interests?.length || 0} />
        <StatCard label="Recommended Courses" value={recommended.length} />
      </div>
      <h3>Recommended</h3>
      <div className="grid">
        {recommended.map(c => (
          <div key={c.id}>{c.title}</div>
        ))}
      </div>
    </div>
  )
}
