import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'rank', label: 'Rank' },
  { key: 'userId', label: 'User' },
  { key: 'teamId', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'period', label: 'Period' },
]

function Leaderboard() {
  return (
    <CollectionPage
      title="Leaderboard"
      description="See how members are placing this period."
      endpoint="/api/leaderboard/"
      fields={fields}
    />
  )
}

export default Leaderboard
