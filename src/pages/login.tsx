import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { demoDb } from '../data/demoDb'
import './login.css'

const OTP = '123456'

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  useEffect(() => {
    if (demoDb.getCurrentUser()) {
      navigate('/dashboard')
    }
  }, [])

  const sendOtp = () => {
    if (!form.name || !form.phone || !form.email) return
    setOtpSent(true)
  }

  const verify = () => {
    if (otp === OTP) {
      demoDb.saveUser(form)
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login / Register</h2>

        {!otpSent ? (
          <>
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <button onClick={sendOtp}>Send OTP</button>
          </>
        ) : (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <button onClick={verify}>Verify & Login</button>
          </>
        )}
      </div>
    </div>
  )
}
