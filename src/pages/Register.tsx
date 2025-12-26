import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TagInput from '../components/TagInput'
import '../styles/register.css'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [interests, setInterests] = useState([])

  const submit = () => {
    localStorage.setItem('user', JSON.stringify({ name, age, interests }))
    navigate('/dashboard')
  }

  return (
    <div className="register-page">

      {/* HERO */}
      <div className="hero">
        <h1>Learn Like Pro</h1>
        <p>
          Your AI-powered study companion to revise smarter, 
          focus better, and crack exams confidently.
        </p>
      </div>

      {/* CARD */}
      <div className="register-card">
        <h2>Create your profile</h2>
        <span className="subtitle">Personalize your learning experience</span>

        <div className="field">
          <label>Name</label>
          <input
            placeholder="Your full name"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Age</label>
          <input
            type="number"
            placeholder="Your age"
            onChange={e => setAge(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Interests</label>
          <TagInput onChange={setInterests} />
        </div>

        <button onClick={submit}>Continue</button>

        <div className="note">
          Secure · No spam · Data stays on your device
        </div>
      </div>

    </div>
  )
}
