import { useNavigate } from 'react-router-dom'
import { Course } from '../types'

interface Props extends Course {
  description?: string
}

export default function CourseCard({ id, title, tag }: Props) {
  const navigate = useNavigate()

  return (
    <div
      className="course-card"
      onClick={() => navigate(`/courses/${id}`)}
    >
      <h4>{title}</h4>
      <span>{tag}</span>
    </div>
  )
}
