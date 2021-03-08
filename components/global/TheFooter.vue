<template>
  <div class="the_footer">&copy; Test Repo {{ year }}</div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
  mounted() {
    this.year = new Date().getFullYear()
  },
}
</script>

<style lang="scss" scoped>
.the_footer {
  padding: 20px 25px;
  background-color: burlywood;
}
</style>
