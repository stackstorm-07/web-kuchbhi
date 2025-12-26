import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const u = localStorage.getItem('user')
    if (u) setUser(JSON.parse(u))
  }, [])

  return (
    <nav className="navbar">
      <h1>Kuch-bhi</h1>

      <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <Link to="/">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/courses">Courses</Link>

        {!user ? (
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        ) : (
          <div className="user-menu">
            <button className="user-name" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Hi, {user.name}
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <p onClick={() => navigate('/profile')}>Profile</p>
                <p onClick={() => navigate('/settings')}>Settings</p>
                <button onClick={() => {
                  localStorage.removeItem('user')
                  navigate('/login')
                }}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}
