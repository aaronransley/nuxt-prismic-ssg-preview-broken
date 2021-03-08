<template>
  <div class="the_header">
    <TypoHeader variant="5" tag="h1">
      <BaseLink no-underline to="/">Test Repo</BaseLink>
    </TypoHeader>
    <div class="nav">
      <ul>
        <li><BaseLink start-blank to="/about">About</BaseLink></li>
        <li><BaseLink start-blank to="/journal">Journal</BaseLink></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.the_header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  padding: 20px 25px;

  background-color: burlywood;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 160px;

  ul {
    @include list-reset;

    display: flex;
    align-items: center;

    li {
      display: block;
      margin-left: 15px;
    }

    li:first-child {
      margin-left: 0;
    }
  }
}
</style>
