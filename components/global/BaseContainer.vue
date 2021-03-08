<template>
  <div class="container" :class="containerClass">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    hasMargin: {
      type: Boolean,
      default: true,
    },
    hasMaxWidth: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    containerClass() {
      return {
        'container-no_margin': !this.hasMargin,
        'container-no_max_width': !this.hasMaxWidth,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: calc(100vw - 40px);

  @include media('>=md') {
    max-width: calc(100vw - 80px);
  }

  @include media('>=max-with-margin') {
    max-width: map-get($breakpoints, 'max');
  }
}

.container-no_margin {
  @include media('<max') {
    max-width: none !important;
  }

  @include media('>=max') {
    max-width: map-get($breakpoints, 'max');
  }
}

.container-no_max_width {
  max-width: calc(100vw - 40px);

  @include media('>=md') {
    max-width: calc(100vw - 80px);
  }
}
</style>
