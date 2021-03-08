import { withSdk } from '../../prismic-sdk'

/**
 * @TODO Add solution for iterating over all pages when pagination is not needed
 */

export async function getAllJournalEntries(existingClientMaybe) {
  return withSdk(existingClientMaybe, async ($prismic) => {
    /* prettier-ignore */
    return await $prismic.api.query(
      $prismic.predicates.at('document.type', 'journal_entry'), {
      pageSize: 100,
    })
  })
}

export async function getSingleJournalEntry(
  options = { uid: null },
  existingClientMaybe
) {
  return withSdk(existingClientMaybe, async ($prismic) => {
    /* prettier-ignore */
    return await $prismic.api.query(
      $prismic.predicates.at('my.journal_entry.uid', options.uid)
    )
  })
}
