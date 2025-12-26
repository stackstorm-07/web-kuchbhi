import * as React from 'react';
import '../styles/dashboard.css';

// 1. Mock Data Setup
interface Course {
  id: number;
  title: string;
  lessonsCompleted: number;
  totalLessons: number;
  hours: number;
  students: number;
  progress: number;
  color: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: "Molecular Biology",
    lessonsCompleted: 21,
    totalLessons: 30,
    hours: 50,
    students: 312,
    progress: 79,
    color: "#00d2d3" // Cyan/Green
  },
  {
    id: 2,
    title: "Color Theory",
    lessonsCompleted: 10,
    totalLessons: 15,
    hours: 45,
    students: 256,
    progress: 64,
    color: "#feca57" // Warm Yellow
  },
  {
    id: 3,
    title: "React.js Patterns",
    lessonsCompleted: 2,
    totalLessons: 20,
    hours: 12,
    students: 890,
    progress: 15,
    color: "#5f27cd" // Deep Purple
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      
      {/* Header Section */}
      <header className="dashboard-header">
        <h1>Hello, Arka 👋</h1>
        <p>Nice to have you back! Continue your dark mode journey.</p>
      </header>

      <div className="dashboard-grid">
        
        {/* --- LEFT COLUMN --- */}
        <div className="left-column">
          <h2 className="section-title">Today's Course</h2>
          
          <div className="courses-list">
            {mockCourses.map((course) => (
              <div key={course.id} className="course-progress-card">
                
                {/* Circular Progress */}
                <div 
                  className="progress-circle" 
                  style={{ 
                    '--percentage': `${course.progress}%`,
                    '--progress-color': course.color 
                  } as React.CSSProperties}
                >
                  <span className="progress-value" style={{ color: course.color }}>
                    {course.progress}%
                  </span>
                </div>

                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-meta">
                    <span>📚 {course.lessonsCompleted}/{course.totalLessons}</span>
                    <span>⏱ {course.hours} min</span>
                    <span>👥 {course.students}</span>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="btn btn-secondary">Skip</button>
                    <button className="btn btn-primary">Continue</button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <h2 className="section-title" style={{ marginTop: '2rem' }}>Your Class</h2>
          
          <div className="dash-card">
             <div style={{ display: 'flex', gap: '15px', alignItems: 'center'}}>
                {/* Updated Icon Background for Dark Mode */}
                <div style={{ width: '40px', height: '40px', background: 'rgba(0, 210, 211, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d2d3' }}>
                    🦠
                </div>
                <div>
                    <h4 style={{ margin: 0, color: 'white' }}>Microbiology Society</h4>
                    <span style={{ fontSize: '0.8rem', color: '#a0aec0' }}>10 Lessons • 45 min</span>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="right-column gamification-grid">
          
          {/* Profile Card */}
          <div className="dash-card profile-stats-card">
            <div className="avatar-placeholder">👨‍🎓</div>
            <div className="user-details">
              <h3>Arka Maulana</h3>
              <p>📍 Surakarta, INA</p>
              <div style={{ marginTop: '5px', fontSize: '0.8rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                Level 12 Scholar
              </div>
            </div>
          </div>

          {/* XP System */}
          <div className="dash-card xp-card">
            <div className="xp-icon">
              <span style={{ fontSize: '2rem' }}>🏆</span>
            </div>
            <div className="xp-info">
              <h2>2400 XP</h2>
              <span>Points Earned</span>
            </div>
            <button className="redeem-btn">Redeem</button>
          </div>

          {/* Stats / Goals - Updated colors for Dark Mode */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
             {/* Use transparent backgrounds with borders instead of solid pastel colors */}
             <div className="dash-card" style={{ background: 'rgba(253, 203, 110, 0.1)', border: '1px solid rgba(253, 203, 110, 0.3)' }}>
                <span style={{ fontSize: '1.5rem' }}>👩‍🏫</span>
                <h4 style={{ margin: '10px 0 5px', color: '#feca57' }}>Consultation</h4>
                <p style={{ fontSize: '0.8rem', margin: 0, color: '#a0aec0' }}>Ask a mentor.</p>
             </div>
             <div className="dash-card" style={{ background: 'rgba(255, 118, 117, 0.1)', border: '1px solid rgba(255, 118, 117, 0.3)' }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <h4 style={{ margin: '10px 0 5px', color: '#ff7675' }}>Set Target</h4>
                <p style={{ fontSize: '0.8rem', margin: 0, color: '#a0aec0' }}>Study timeline.</p>
             </div>
          </div>

          {/* Activity Chart */}
          <div className="dash-card">
            <h4 style={{ margin: 0, color: 'white' }}>Learning Activity</h4>
            <div className="chart-container">
               <div className="bar" style={{ height: '40%' }}></div>
               <div className="bar" style={{ height: '60%' }}></div>
               <div className="bar active" style={{ height: '80%' }}></div>
               <div className="bar" style={{ height: '50%' }}></div>
               <div className="bar" style={{ height: '70%' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#a0aec0', marginTop: '5px' }}>
                <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;