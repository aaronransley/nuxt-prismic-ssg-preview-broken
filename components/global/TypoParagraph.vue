<template>
  <p class="typo_paragraph">
    <slot />
  </p>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.typo_paragraph {
  margin: 0;

  @include t-paragraph;
}

.typo_paragraph + .typo_paragraph {
  margin-top: 30px;
}
</style>
