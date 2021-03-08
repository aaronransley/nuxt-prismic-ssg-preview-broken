<template>
  <div class="base_button" :class="buttonClass">
    <button class="base_button--btn">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    noStyles: {
      type: Boolean,
      default: false,
    },
    linkStyles: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass() {
      return [
        this.noStyles || this.linkStyles ? 'base_button-no_styles' : '',
        this.linkStyles ? 'base_button-link_styles' : '',
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.base_button:not(.base_button-no_styles) {
  @include button-styles;
}

.base_button--btn {
  @include btn-reset;

  .base_button-link_styles & {
    @include underline-styles;
  }
}
</style>
