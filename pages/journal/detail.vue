<template>
  <ThePage>
    <BaseContainer>
      <div class="searchbar">
        <div class="searchbar-input">
          <label>
            <span>edit slug:</span>
            <input
              type="text"
              v-model="lookupSlug"
              placeholder="lookup journal entry by slug"
            />
          </label>
        </div>
        <div class="searchbar-status">
          <template v-if="lookupInProgress">🔁</template>
          <template v-else-if="!journalEntry">❌</template>
          <template v-else>✅</template>
        </div>
      </div>
      <template v-if="journalEntry">
        <TypoHeader variant="1" tag="h1">{{
          $prismic.asText(journalEntry.data.title)
        }}</TypoHeader>
        <PrintObject :val="journalEntry" />
      </template>
    </BaseContainer>
  </ThePage>
</template>

<script>
import { getSingleJournalEntry } from '~/services/cms/collections/journal-entries'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      lookupInProgress: false,
      lookupSlug: null,
      journalEntry: null,
    }
  },
  created() {
    this.lookupSlug = this.$route.params.slug
    this.debouncedLoadFresh = debounce(this.loadFresh, 500)
  },
  mounted() {
    this.$watch('lookupSlug', this.debouncedLoadFresh)
  },
  methods: {
    async loadFresh() {
      this.lookupInProgress = true
      this.journalEntry = (
        await asyncDataInner(this.$prismic, this.lookupSlug)
      ).journalEntry
      this.lookupInProgress = false
    },
  },
  async asyncData({ $prismic, params }) {
    return await asyncDataInner($prismic, params.slug)
  },
}

// Function exists outside of component scope to ensure it can
// be accessed during serverside asyncData executions
async function asyncDataInner($prismic, slug) {
  let journalEntry = await getSingleJournalEntry({ uid: slug }, $prismic)
  if (journalEntry.results_size) {
    return {
      journalEntry: journalEntry.results[0],
    }
  } else {
    return {
      journalEntry: null,
    }
  }
}
</script>

<style lang="scss" scoped>
.searchbar {
  display: flex;
  align-items: center;
  padding-bottom: 35px;

  label > span {
    font-size: 14px;
    font-style: italic;
    padding-right: 7px;
  }
}

.searchbar-input input {
  width: 240px;
  padding: 7px 14px;
  border: 0;
  background-color: #e2e2e2;
  color: $c-black;
}

.searchbar-status {
  padding: 15px;
}
</style>
