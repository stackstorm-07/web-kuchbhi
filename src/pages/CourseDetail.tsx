import { useParams } from 'react-router-dom'
import { courses } from '../data/courses'
import '../styles/course-detail.css'

export default function CourseDetail() {
  const { id } = useParams()
  const course = courses.find(c => c.id === Number(id))
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!course) {
    return <div style={{ padding: '2rem' }}>Course not found</div>
  }

  const matchedTags = course.tags.filter((t: string) =>
    user.interests?.includes(t)
  )

  const mastery =
    matchedTags.length === 0
      ? 'Beginner'
      : matchedTags.length < course.tags.length
      ? 'Intermediate'
      : 'Advanced'

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>

      <p className="description">{course.description}</p>

      <div className="meta">
        <div>
          <strong>Mastery Level:</strong> {mastery}
        </div>

        <div className="tags">
          {course.tags.map(t => (
            <span key={t} className={matchedTags.includes(t) ? 'active' : ''}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <button className="start-btn">
        {mastery === 'Beginner' ? 'Start Course' : 'Continue Course'}
      </button>
    </div>
  )
}
