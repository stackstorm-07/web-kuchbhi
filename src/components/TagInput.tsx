import { useState } from 'react'

interface Props {
  onChange: (tags: string[]) => void
}

export default function TagInput({ onChange }: Props) {
  const [input, setInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const addTag = () => {
    if (!input.trim()) return
    const updated = [...tags, input.toLowerCase()]
    setTags(updated)
    onChange(updated)
    setInput('')
  }

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="interest tag"
      />
      <button onClick={addTag}>+</button>
      <div>
        {tags.map(t => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  )
}
