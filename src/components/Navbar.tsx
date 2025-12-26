import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { demoDb } from '../data/demoDb'
import '../styles/navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const profileRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUser(demoDb.getCurrentUser())
  }, [location.pathname])

  useEffect(() => {
    if (!linksRef.current || !underlineRef.current) return

    const active = linksRef.current.querySelector(
      '.nav-item.active'
    ) as HTMLElement | null

    if (!active) return

    const rect = active.getBoundingClientRect()
    const parentRect = linksRef.current.getBoundingClientRect()

    underlineRef.current.style.width = `${rect.width}px`
    underlineRef.current.style.transform = `translateX(${rect.left - parentRect.left}px)`
  }, [location.pathname])

  const logout = () => {
    demoDb.logout()
    setUser(null)
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname === path

  /** CRITICAL FIX */
  const handleMouseLeave = (e: React.MouseEvent) => {
    const next = e.relatedTarget as Node | null
    if (profileRef.current && next && profileRef.current.contains(next)) {
      return // mouse moved within dropdown → do NOT close
    }
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => navigate('/')}>
        Kuch-bhi
      </h1>

      <div className="nav-links" ref={linksRef}>
        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          Register
        </Link>

        <Link
          to="/dashboard"
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          Dashboard
        </Link>

        <Link
          to="/courses"
          className={`nav-item ${isActive('/courses') ? 'active' : ''}`}
        >
          Courses
        </Link>

        <span className="nav-underline" ref={underlineRef} />
      </div>

      <div className="nav-right">
        {!user ? (
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        ) : (
          <div
            className="profile-wrapper"
            ref={profileRef}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="profile-icon">
              {user.name[0].toUpperCase()}
            </div>

            {open && (
              <div className="profile-dropdown">
                <p onClick={() => navigate('/profile')}>Profile</p>
                <p onClick={() => navigate('/settings')}>Settings</p>
                <p onClick={() => navigate('/appearance')}>Appearance</p>
                <hr />
                <p className="danger" onClick={logout}>Logout</p>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
