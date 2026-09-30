import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function formatValue(value, field) {
  if (value == null || value === '') {
    return '-'
  }
  if (Array.isArray(value)) {
    return value.length > 0 ? value.map(String).join(', ') : '-'
  }
  if (field.endsWith('At')) {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString()
  }
  if (typeof value === 'object') {
    return value.name ?? value.username ?? value._id ?? JSON.stringify(value)
  }
  return String(value)
}

function CollectionPage({ title, description, endpoint, fields }) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')
      try {
        const collection = await fetchCollection(endpoint, controller.signal)
        setItems(collection.items)
        setTotal(collection.total)
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load this collection.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section aria-labelledby="collection-title">
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-4">
        <div>
          <h2 id="collection-title" className="h3 mb-1">
            {title}
          </h2>
          <p className="text-body-secondary mb-0">{description}</p>
        </div>
        {!loading && !error && (
          <span className="badge text-bg-primary">
            {total} {total === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      {loading && (
        <p role="status" className="text-body-secondary">
          Loading {title.toLowerCase()}...
        </p>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-light border" role="status">
          No {title.toLowerCase()} to show yet.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="table-responsive rounded border">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {fields.map(({ key, label }) => (
                  <th scope="col" key={key}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {fields.map(({ key }) => (
                    <td key={key}>{formatValue(item[key], key)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage
