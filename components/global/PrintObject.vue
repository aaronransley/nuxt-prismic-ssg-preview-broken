<template>
  <div class="print_object">
    <pre>{{ val }}</pre>
  </div>
</template>

<script>
export default {
  props: ['val'],
}
</script>

<style lang="scss" scoped>
.print_object {
}

pre {
  font-size: 12px;
  max-height: 400px;
  width: 100%;
  overflow: auto;
}
</style>
