import { withSdk } from '~/services/prismic-sdk'

export async function getHomepage(existingClientMaybe) {
  return withSdk(existingClientMaybe, async ($prismic) => {
    return await $prismic.api.getSingle('homepage')
  })
}
