import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'displayName', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'points', label: 'Points' },
  { key: 'teamId', label: 'Team' },
]

function Users() {
  return (
    <CollectionPage
      title="Members"
      description="Meet the athletes tracking their progress with OctoFit."
      endpoint="/api/users/"
      fields={fields}
    />
  )
}

export default Users
