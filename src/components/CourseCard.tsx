import { useNavigate } from 'react-router-dom'
import { Course } from '../types'

interface Props extends Course {}

export default function CourseCard({ id, title, tag }: Props) {
  const navigate = useNavigate()

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = -(y - centerY) / 18
    const rotateY = (x - centerX) / 18

    card.style.setProperty('--rx', `${rotateX}deg`)
    card.style.setProperty('--ry', `${rotateY}deg`)
  }

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.setProperty('--rx', `0deg`)
    card.style.setProperty('--ry', `0deg`)
  }

  return (
    <div
      className="course-card"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onClick={() => navigate(`/courses/${id}`)}
    >
      <h4>{title}</h4>
      <span>{tag}</span>
    </div>
  )
}
