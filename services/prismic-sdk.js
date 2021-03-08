export async function withSdk($existingClientMaybe, consumer, addOptions) {
  // Use existing Prismic.client instance if provided
  if ($existingClientMaybe != null) {
    return await consumer($existingClientMaybe)
  }

  // Otherwise, assume we're in the server context & create a new Prismic instance
  else {
    let options = {}
    if (process.env.PRISMIC_TOKEN) {
      options.accessToken = process.env.PRISMIC_TOKEN
    }

    const Prismic = require('@prismicio/client')
    const client = Prismic.client(process.env.PRISMIC_API, {
      ...options,
      ...addOptions,
    })

    // Provide the consumer with an object that includes an instance
    // of the client and a subset of the core Prismic object keys
    return await consumer({ predicates: Prismic.predicates, api: client })
  }
}
