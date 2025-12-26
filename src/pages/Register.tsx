import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TagInput from '../components/TagInput'
import '../styles/register.css'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [interests, setInterests] = useState<string[]>([])

  const submit = () => {
    localStorage.setItem('user', JSON.stringify({ name, age, interests }))
    navigate('/dashboard')
  }

  return (
    <div className="register">
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Age" onChange={e => setAge(+e.target.value)} />
      <TagInput onChange={setInterests} />
      <button onClick={submit}>Continue</button>
    </div>
  )
}
