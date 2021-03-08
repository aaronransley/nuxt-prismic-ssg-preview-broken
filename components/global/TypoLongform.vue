<script>
import { RichText } from 'prismic-dom'

export default {
  props: {
    richText: {
      default: null,
    },
  },
  methods: {
    asRichText: function (value) {
      return RichText.asHtml(
        value,
        this.$prismic.linkResolver,
        this.$prismic.htmlSerializer
      )
    },
  },
  render(h) {
    if (this.$props.richText) {
      return h('div', {
        class: 'typo_longform',
        domProps: { innerHTML: this.asRichText(this.$props.richText) },
      })
    } else {
      return h('div', { class: 'typo_longform' }, this.$slots.default)
    }
  },
}
</script>

<style lang="scss">
.typo_longform {
  ul {
    @include list-basic;
  }

  ol {
    @include list-numbered;
  }

  blockquote {
    margin-left: 0;
    padding-left: 1em;

    color: $c-border;
    border-left: 4px solid $c-grey;

    font-style: italic;
  }

  p,
  ul,
  ol,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  embed,
  video,
  pre,
  blockquote {
    margin-top: 1em;
    margin-bottom: 0;
  }

  .base_image {
    margin-top: 1em;
  }

  .base_image > img {
    margin-top: 0;
  }

  ul li,
  ol li {
    ul,
    ol {
      margin-top: 0.3em;
    }
  }

  p,
  ul,
  ol,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  table th,
  table td {
    @include t-paragraph;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;

    margin-top: 2.25em;

    & + ol,
    & + ul {
      margin-top: 0.5em;
    }
  }
}

.typo_longform >,
.typo_longform > .base_markdown:first-child > {
  p,
  ul,
  ol,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  .base_image,
  embed,
  video,
  pre,
  blockquote {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
