<template>
  <div class="base_image" :class="imageClass" :style="imageAspectRatio">
    <img class="lazyload" v-once :src="initialSrc" v-bind="$attrs" ref="img" />
  </div>
</template>

<script>
import { aspectRatioAsPaddingTop } from '~/lib/style-utils'

export default {
  inheritAttrs: false,
  props: {
    objectFit: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: Boolean,
      default: false,
    },
    placeholderSquare: {
      type: Boolean,
      default: false,
    },
    aspectRatio: {
      type: String,
      default: null,
    },
  },
  data() {
    return {}
  },
  computed: {
    imageClass() {
      return [
        this.objectFit ? 'base_image-object_fit' : '',
        this.aspectRatio ? 'base_image-ratioed' : '',
      ]
    },
    initialSrc() {
      if (this.$attrs.src) {
        return this.$attrs.src
      } else if (this.$props.placeholder) {
        return require(`~/assets/images/placeholder-16x9.png`)
      } else if (this.$props.placeholderSquare) {
        return require(`~/assets/images/placeholder-1x1.png`)
      }
    },
    imageAspectRatio() {
      if (this.aspectRatio) {
        return {
          paddingTop: this.aspectRatioAsPaddingTop(this.aspectRatio),
        }
      }
    },
  },
  methods: {
    aspectRatioAsPaddingTop,
  },
}
</script>

<style lang="scss" scoped>
.base_image {
  background-color: $c-grey;
  overflow: hidden;
  margin-bottom: 1em;

  &.base_image-object_fit {
    display: flex;
    width: 100%;
  }

  &.base_image-ratioed {
    position: relative;
  }
}

.base_image img {
  width: 100%;
  max-width: 100%;
  transition: opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1),
    transform 1s cubic-bezier(0.215, 0.61, 0.355, 1);

  &.lazyload,
  &.lazyloading {
    opacity: 0;
  }
}

.base_image-object_fit img {
  @include object-fit(cover);
}

.base_image-ratioed img {
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
}
</style>
