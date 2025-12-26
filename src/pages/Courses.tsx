import { courses } from '../data/courses'
import CourseCard from '../components/CourseCard'
import '../styles/courses.css'

export default function Courses() {
  return (
    <div className="courses">
      <h2>All Courses</h2>
      <div className="grid">
        {courses.map(c => (
          <CourseCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  )
}
