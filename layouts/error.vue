<template>
  <ThePage>
    <BaseContainer>
      <template v-if="!error || error.statusCode == 404">
        <TypoHeader variant="1" tag="h1">404 - Not Found</TypoHeader>
        <TypoParagraph>Sorry, we can't find that!</TypoParagraph>
      </template>
      <template v-else>
        <TypoHeader variant="1" tag="h1">Unexpected Error</TypoHeader>
        <TypoParagraph>
          Sorry, we ran into a bramble and had to stop.
        </TypoParagraph>
        <TypoParagraph>
          Site administrators have been notified, please go back and try again.
        </TypoParagraph>
      </template>
      <TypoParagraph>
        <BaseLink to="/">Back to homepage</BaseLink>
      </TypoParagraph>
    </BaseContainer>
  </ThePage>
</template>

<script>
export default {
  props: ['error'],
  head() {
    return this.$setHead({ addTitle: 'Not Found' })
  },
}
</script>
