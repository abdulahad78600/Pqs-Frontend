// Lightweight client-side event tracking.
//
// NOTE: This fires a fire-and-forget POST to the backend so we can record who
// opens external resources (e.g. Cana Extract). The receiving endpoint
// `/analytics/track-event` DOES NOT YET EXIST on the backend — until it is
// built, these calls will 404 and are silently swallowed (no user impact).
//
// Backend TODO (server repo, not this one):
//   POST /analytics/track-event
//   body: { eventType, userId, email, timestamp, data }
//   -> persist to an events table; expose a report of "who clicked X".
//
// The axios request interceptor already attaches the JWT, so the backend can
// also derive the user from the token rather than trusting the body.
import api from './axios.js'

export function trackEvent(eventType, data = {}) {
  // Best-effort: never let analytics break the user's action.
  try {
    api.post('/analytics/track-event', {
      eventType,
      timestamp: new Date().toISOString(),
      data,
    }).catch(() => {})
  } catch {
    // no-op
  }
}
