import CollectionPage from './CollectionPage.jsx'

const fields = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  { key: 'memberIds', label: 'Members' },
]

function Teams() {
  return (
    <CollectionPage
      title="Teams"
      description="Find a team and keep each other moving."
      endpoint="/api/teams/"
      fields={fields}
    />
  )
}

export default Teams
