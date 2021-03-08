<template>
  <div class="site_wrap">
    <TheHeader />
    <nuxt id="main" />
    <TheFooter />
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('click', this.externalLinkHandler)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.externalLinkHandler)
  },

  methods: {
    externalLinkHandler(event) {
      function openInNewWindow(event, href) {
        window.open(href)
        event.preventDefault()
      }

      const isAnExternalHref = event.target.matches('a[href^="http"]')
      const isInsideAnExternalHref = event.target.matches('a[href^="http"] *')

      if (isAnExternalHref) {
        openInNewWindow(event, event.target.href)
      } else if (isInsideAnExternalHref) {
        const closestHref = event.target.closest('a[href^="http"]')
        openInNewWindow(event, closestHref.href)
      }
    },
  },
}
</script>
