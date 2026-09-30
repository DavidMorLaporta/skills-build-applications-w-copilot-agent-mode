const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function getCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length }
  }

  if (payload && typeof payload === 'object') {
    const items = payload.results ?? payload.data ?? payload.items
    if (Array.isArray(items)) {
      return {
        items,
        total: Number.isFinite(payload.count) ? payload.count : items.length,
      }
    }
  }

  throw new Error('The API returned an unsupported collection response.')
}

export async function fetchCollection(endpoint, signal) {
  let response
  try {
    response = await fetch(`${apiBaseUrl}${endpoint}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    throw new Error(`Unable to reach the OctoFit API at ${apiBaseUrl}.`, {
      cause: error,
    })
  }

  if (!response.ok) {
    throw new Error(`The API request failed with status ${response.status}.`)
  }

  return getCollection(await response.json())
}
