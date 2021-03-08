<template>
  <ThePage>
    <BaseContainer>
      <TypoHeader variant="1" tag="h1">{{ page.uid }}</TypoHeader>
      <TypoLongform :richText="page.data.text_area" />
      <PrintObject :val="page" />
    </BaseContainer>
  </ThePage>
</template>

<script>
import { getHomepage } from '~/services/cms/singletons/homepage'

export default {
  data() {
    return {
      page: null,
    }
  },
  async asyncData({ $prismic }) {
    return {
      page: await getHomepage($prismic),
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/ .typo_longform {
  background-color: fade-out(salmon, 0.8);
  border-radius: 15px;
  padding: 1em;
}
</style>
