import { Course } from '../types'

export default function CourseCard({ title, tag }: Course) {
  return (
    <div className="course-card">
      <h4>{title}</h4>
      <span>{tag}</span>
    </div>
  )
}
