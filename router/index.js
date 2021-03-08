import { getAllJournalEntries } from '../services/cms/collections/journal-entries'

export async function coreRoutes(routes, find) {
  /**
   * Ensure detail page routes defined here represented in the
   * Prismic Link Resolver at ~/app/prismic/link-resolver.js
   */
  const coreRoutes = [
    {
      path: '/',
      name: 'homepage',
      component: pageCmp('homepage', find),
    },
    {
      path: '/about',
      name: 'about',
      component: pageCmp('about', find),
    },
    {
      path: '/journal',
      name: 'journal-index',
      component: pageCmp('journal/index', find),
    },
    {
      // See ~/app/prismic/link-resolver.js
      path: '/journal/:slug',
      name: 'journal-detail',
      component: pageCmp('journal/detail', find),
    },
  ]
  routes.push(...coreRoutes)
}

export async function generateRoutes() {
  let urls = []

  // Add journal entry detail pages
  let journalEntries = await getAllJournalEntries()
  urls.push(
    ...journalEntries.results.map((doc) => {
      return `/journal/${doc.uid}`
    })
  )

  return urls
}

// Helper to increase the ergonomics of including a page component
function pageCmp(path, find) {
  return find(__dirname, `../pages/${path}.vue`)
}
