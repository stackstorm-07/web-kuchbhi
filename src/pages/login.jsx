import { useState, useEffect } from 'react'
import './login.css'

export default function Login() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const GENERATED_OTP = '123456'

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) setUser(storedUser)
  }, [])

  const sendOtp = () => {
    if (!form.name || !form.phone || !form.email) return
    setOtpSent(true)
    alert('OTP sent: 123456')
  }

  const verifyOtp = () => {
    if (otp === GENERATED_OTP) {
      localStorage.setItem('user', JSON.stringify(form))
      setUser(form)
      setOtpSent(false)
      setForm({ name: '', phone: '', email: '' })
    } else {
      alert('Invalid OTP')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setShowProfile(false)
  }

  return (
    <div className="login-page">
      <div className="navbar">
        <h1>Learn Like Pro</h1>
        {user && (
          <div className="navbar-buttons">
            <button onClick={() => setShowProfile(!showProfile)}>Profile</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>

      {user && showProfile && (
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {!user && (
        <div className="login-card">
          <h2>Login</h2>
          {!otpSent ? (
            <>
              <input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <button onClick={e => { e.preventDefault(); sendOtp(); }}>Send OTP</button>
            </>
          ) : (
            <>
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
              <button onClick={e => { e.preventDefault(); verifyOtp(); }}>Verify & Login</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
