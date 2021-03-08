<template>
  <span class="base_link--wrap" :class="wrapperClass">
    <template v-if="isExternalLink">
      <a
        v-bind="$attrs"
        v-on="$listeners"
        class="base_link"
        :href="targetToUse"
        :class="linkClass"
      >
        <slot />
        <InlineLocalSvg
          class="new-window-icon"
          v-if="newWindowIcon"
          src="~/assets/svgs/new-window-icon.svg"
        >
        </InlineLocalSvg>
        <span class="sr-only">(opens in new window)</span>
      </a>
    </template>
    <template v-else-if="targetToUse">
      <NuxtLink
        v-bind="$attrs"
        v-on="$listeners"
        class="base_link"
        :to="targetToUse"
        :class="linkClass"
      >
        <slot />
      </NuxtLink>
    </template>
    <template v-else>
      <span
        v-bind="$attrs"
        v-on="$listeners"
        class="base_link"
        :class="linkClass"
      >
        <slot />
      </span>
    </template>
  </span>
</template>

<script>
/**
 * This component will auto-detect the given link prop and provide the appropriate
 * component (either a NuxtLink or regular <a> element) with the 'to' and 'href'
 * attributes set. Absolute links to the same site (calculated from process.env.BASE_URL)
 * will be converted to relative links to take advantage of Vue routing if provided
 * through the 'to' prop
 */
export default {
  props: {
    noUnderline: {
      type: Boolean,
      default: false,
    },
    startBlank: {
      type: Boolean,
      default: false,
    },
    /**
     * Use me in conjunction with BaseLinkChildUnderline component to wrap cards, media items,
     * etc. and get an underline to appear somewhere within the child whenever any area of the
     * parent is hovered. Setting to true will also set `font-size: 0` on the wrapping link
     * to avoid whitespace issues w/ the `display: inline-block` on the wrapping link, so
     * ensure children are setting their own `font-size`
     */
    withChildUnderline: {
      type: Boolean,
      default: false,
    },
    buttonStyles: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [String, Object],
    },
    href: {
      type: String,
    },
    newWindowIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    propToUse() {
      return this.to || this.href
    },
    isExternalLink() {
      // Force external behavior if href is used
      if (this.href && !this.to) return true
      // If it's a NuxtLink object or undefined, it shouldn't be external
      if (
        typeof this.propToUse === 'object' ||
        typeof this.propToUse === 'undefined'
      )
        return false
      // Check if the given link goes to an external site
      else if (
        this.propToUse.charAt(0) !== '/' &&
        !this.propToUse.includes(process.env.BASE_URL)
      )
        return true
      else return false
    },
    targetToUse() {
      // If there isn't a link, return null
      if (typeof this.propToUse === 'undefined') return null

      // If given a NuxtLink object, just use that
      if (typeof this.propToUse === 'object') return this.propToUse

      // If it's an external link or was already a relative link, just use it
      if (this.isExternalLink || this.propToUse.charAt(0) === '/') {
        return this.propToUse
      }
      // The target links to the current site, so it should be turned into
      // a relative link
      else if (this.propToUse.includes(process.env.BASE_URL)) {
        return this.propToUse.replace(/^.*\/\/[^\/]+/, '')
      }
    },
    linkClass() {
      return [
        this.startBlank ? 'base_link-start_blank' : '',
        this.noUnderline || this.buttonStyles ? 'base_link-no_underline' : '',
        this.withChildUnderline ? 'base_link-child_underline' : '',
      ]
    },
    wrapperClass() {
      return [this.buttonStyles ? 'base_link-button_styles' : '']
    },
  },
}
</script>

<style lang="scss" scoped>
.base_link--wrap {
  display: inline-block;
  cursor: pointer;
}

.base_link {
  text-decoration: none;
  cursor: pointer;

  /deep/ svg {
    width: 20px;
  }
}

// Underline directly on .base_link unless a withChildUnderline is being requested
.base_link:not(.base_link-child_underline) {
  @include underline-styles;

  &:hover,
  &:focus {
    background-size: 0 1px;
    background-position-x: 100%;
  }

  &.base_link-start_blank {
    background-size: 0 1px;
  }

  &.base_link-start_blank {
    &:hover,
    &:focus {
      background-size: 100% 1px;
      background-position-x: 0;
    }
  }
}

// If a child underline if being requested, ensure /deep/ selector is used to
// target the descendant element class
.base_link.base_link-child_underline {
  // font-size: 0; // No font size for wrapping link block; children should provide

  /deep/ .base_link--child_underline {
    @include underline-styles;
  }
}

// Handle hovers for standard child underline
.base_link.base_link-child_underline {
  &:hover,
  &:focus {
    /deep/ .base_link--child_underline {
      background-size: 0 1px;
    }
  }
}

// If a child underline is being requested, but startBlank is also specified,
// ensure the child underline starts blank
.base_link.base_link-start_blank.base_link-child_underline {
  /deep/ .base_link--child_underline {
    background-size: 0 1px;
  }
}

.base_link.base_link-start_blank.base_link-child_underline {
  &:hover,
  &:focus {
    /deep/ .base_link--child_underline {
      background-size: 100% 1px;
    }
  }
}

.base_link-no_underline,
.base_link-no_underline /deep/ .base_link--child_underline {
  background-size: 0 !important;
}

/**
 * Hover states for common children
 *************************
*/

.base_link {
  &:hover,
  &:focus {
    // Wrapped around a base_tile
    // Wrapped around a base_image
    /deep/ .base_image img {
      transform: scale(1.05);
    }
  }
}

.base_link-subtle_hover {
  &:hover,
  &:focus {
    /deep/ .base_image img {
      transform: scale(1.025);
    }
  }
}

.base_link--wrap.base_link-button_styles {
  @include button-styles;
}

svg.new-window-icon {
  position: relative;
  top: -1px;

  height: 11px;
  margin-left: 2px;
  width: 11px;

  g {
    fill: currentColor;
  }
}
</style>
