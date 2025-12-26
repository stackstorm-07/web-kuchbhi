import { Link } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Kuch-bhi</h1>
      <div>
        <Link to="/">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/courses">Courses</Link>
      </div>
    </nav>
  )
}
