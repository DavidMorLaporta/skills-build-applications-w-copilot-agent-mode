import { Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  return (
    <main className="container py-5">
      <header className="d-flex align-items-center gap-3 mb-5">
        <img src={octofitLogo} alt="OctoFit Tracker" width="72" height="72" />
        <div>
          <h1 className="h2 mb-1">OctoFit Tracker</h1>
          <p className="text-body-secondary mb-0">Your fitness journey starts here.</p>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <section aria-labelledby="welcome-heading">
              <h2 id="welcome-heading" className="h4">
                Welcome
              </h2>
              <p className="text-body-secondary">
                Track activities, train with your team, and reach your goals.
              </p>
            </section>
          }
        />
        <Route
          path="*"
          element={
            <section>
              <h2 className="h4">Page not found</h2>
              <a href="/">Return to OctoFit Tracker</a>
            </section>
          }
        />
      </Routes>
    </main>
  )
}

export default App
