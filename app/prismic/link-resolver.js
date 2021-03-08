/**
 * Ensure link paths defined here represented in the
 * site router at ~/router/index.js
 */

export default function (doc) {
  if (doc.type === 'journal_entry') {
    return `/journal/${doc.uid}`
  }

  return null
}
