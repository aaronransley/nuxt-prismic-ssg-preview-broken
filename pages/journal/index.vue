<template>
  <ThePage>
    <BaseContainer>
      <TypoHeader variant="1" tag="h2">Journal Entries</TypoHeader>
      <ul>
        <li v-for="entry in journalEntries" :key="entry.uid">
          <TypoHeader variant="5" tag="h3">
            <BaseLink :to="`/journal/${entry.uid}`">
              {{ $prismic.asText(entry.data.title) }}
            </BaseLink>
          </TypoHeader>
        </li>
        <li>
          <TypoHeader variant="5" tag="h3">
            <BaseLink :to="`/journal/__broken`">
              Intentionally Broken Link
            </BaseLink>
          </TypoHeader>
        </li>
      </ul>
    </BaseContainer>
  </ThePage>
</template>

<script>
import { getAllJournalEntries } from '~/services/cms/collections/journal-entries'

export default {
  data() {
    return {}
  },
  async asyncData({ $prismic }) {
    return {
      journalEntries: (await getAllJournalEntries($prismic)).results,
    }
  },
}
</script>

<style lang="scss" scoped></style>
