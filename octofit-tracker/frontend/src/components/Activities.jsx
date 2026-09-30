import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'type', label: 'Activity' },
  { key: 'userId', label: 'User' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'calories', label: 'Calories' },
  { key: 'performedAt', label: 'Date' },
]

function Activities() {
  return (
    <CollectionPage
      title="Activities"
      description="Recent workouts and movement logged by the community."
      endpoint="/api/activities/"
      fields={fields}
    />
  )
}

export default Activities
