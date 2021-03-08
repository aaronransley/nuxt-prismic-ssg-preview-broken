<template>
  <main class="the_page">
    <slot />
  </main>
</template>

<script>
export default {
  props: {},
}
</script>

<style lang="scss" scoped>
.the_page {
  // Account for fixed header height
  padding: 70px + 30px 0;
  min-height: 100vh;

  @include media('>=max') {
    padding: 140px 0;
  }
}
</style>
