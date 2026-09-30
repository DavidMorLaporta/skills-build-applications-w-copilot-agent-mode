import { Link, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { to: '/users', label: 'Members' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="bg-white border-bottom">
        <div className="container py-3">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <Link
              to="/"
              className="d-flex align-items-center gap-3 text-decoration-none text-dark me-auto"
            >
              <img src={octofitLogo} alt="" width="52" height="52" />
              <span>
                <span className="d-block h4 mb-0">OctoFit Tracker</span>
                <span className="small text-body-secondary">
                  Move together. Go further.
                </span>
              </span>
            </Link>
          </div>
          <nav className="nav nav-pills flex-wrap gap-2 mt-3" aria-label="Main navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Overview
            </NavLink>
            {navigation.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-5 flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <section className="p-4 p-md-5 bg-white border rounded-3 shadow-sm">
                <p className="text-primary fw-semibold mb-2">Your fitness community</p>
                <h1 className="display-6 fw-bold">Small steps. Strong teams.</h1>
                <p className="lead text-body-secondary mb-4">
                  Log your movement, cheer on your teammates, and find a workout for
                  whatever comes next.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {navigation.map(({ to, label }) => (
                    <Link key={to} to={to} className="btn btn-outline-primary">
                      Explore {label.toLowerCase()}
                    </Link>
                  ))}
                </div>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <section className="alert alert-light border">
                <h1 className="h4">Page not found</h1>
                <Link to="/">Return to OctoFit Tracker</Link>
              </section>
            }
          />
        </Routes>
      </main>
      <footer className="container py-3 text-center small text-body-secondary">
        OctoFit Tracker
      </footer>
    </div>
  )
}

export default App
