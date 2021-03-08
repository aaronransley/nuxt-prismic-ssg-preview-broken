<template>
  <component class="typo_header" :is="desiredTag" :class="headerClass">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: '',
      required: false,
    },
    variant: {
      type: String,
      required: true,
      validator: (val) => parseInt(val) >= 1 && parseInt(val) <= 6,
    },
    size: {
      type: String,
      default: '',
      validator: (val) => ['', 'sm', 'md', 'lg'].find((s) => s == val) !== -1,
    },
    withMargin: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    headerClass() {
      return [
        this.withMargin ? 'typo_header-with_margin' : '',
        this.inline ? 'typo_header-display_inline' : '',
        this.size
          ? `typo_header-variant_${this.variant}_${this.size}`
          : `typo_header-variant_${this.variant}`,
      ]
    },
    desiredTag() {
      if (this.tag !== '') {
        return this.tag
      } else {
        return 'h' + this.variant
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.typo_header {
  display: block;
}

.typo_header-display_inline {
  // inline-block display helps with BaseLink and underline animations
  display: inline-block;
}

.typo_header-with_margin {
  margin-top: 2em;
}

// Would love dynamically generate these classes, but SCSS
// doesn't allow dynamic invocation of mixins at the moment:
// @see https://github.com/sass/sass/issues/626#issuecomment-393298055

// Header text one
// ------------------------

.typo_header-variant_1 {
  @include t-header-1;
}

.typo_header-variant_1_sm {
  @include t-header-1-sm;
}

.typo_header-variant_1_md {
  @include t-header-1-md;
}

.typo_header-variant_1_lg {
  @include t-header-1-lg;
}

// Header text two
// ------------------------

.typo_header-variant_2 {
  @include t-header-2;
}

.typo_header-variant_2_sm {
  @include t-header-2-sm;
}

.typo_header-variant_2_md {
  @include t-header-2-md;
}

.typo_header-variant_2_lg {
  @include t-header-2-lg;
}

// Header text three
// ------------------------

.typo_header-variant_3 {
  @include t-header-3;
}

.typo_header-variant_3_sm {
  @include t-header-3-sm;
}

.typo_header-variant_3_md {
  @include t-header-3-md;
}

.typo_header-variant_3_lg {
  @include t-header-3-lg;
}

// Header text four
// ------------------------

.typo_header-variant_4 {
  @include t-header-4;
}

.typo_header-variant_4_sm {
  @include t-header-4-sm;
}

.typo_header-variant_4_md {
  @include t-header-4-md;
}

.typo_header-variant_4_lg {
  @include t-header-4-lg;
}

// Header text five
// ------------------------

.typo_header-variant_5 {
  @include t-header-5;
}

.typo_header-variant_5_sm {
  @include t-header-5-sm;
}

.typo_header-variant_5_md {
  @include t-header-5-md;
}

.typo_header-variant_5_lg {
  @include t-header-5-lg;
}

// Header text six
// ------------------------

.typo_header-variant_6 {
  @include t-header-6;
}

.typo_header-variant_6_sm {
  @include t-header-6-sm;
}

.typo_header-variant_6_md {
  @include t-header-6-md;
}

.typo_header-variant_6_lg {
  @include t-header-6-lg;
}
</style>
