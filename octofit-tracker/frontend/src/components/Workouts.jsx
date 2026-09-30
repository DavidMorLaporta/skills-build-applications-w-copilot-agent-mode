import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'title', label: 'Workout' },
  { key: 'description', label: 'About' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'targetActivities', label: 'Activities' },
]

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      description="Explore workout suggestions for your next session."
      endpoint="/api/workouts/"
      fields={fields}
    />
  )
}

export default Workouts
