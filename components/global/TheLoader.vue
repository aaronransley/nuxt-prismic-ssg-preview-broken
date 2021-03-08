<template>
  <div class="the_loader--wrap">
    <transition name="fade">
      <div class="the_loader" v-if="loading"></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    start() {
      this.loading = true
      // You could hide global site elements at this time, or even set a state in the Vuex
      // store, later referencing it's the store within various site components, to help
      // decentralize loading behavior
    },
    finish() {
      // Using this.$nextTick here to give Vue a moment to reconcile the DOM before
      // the loader is considered "done". See https://vuejs.org/v2/api/#Vue-nextTick
      this.$nextTick(() => {
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.the_loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: $c-black;
  font-size: 0;

  z-index: 9999;

  animation-name: loading-bar;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
}

@keyframes loading-bar {
  0% {
    width: 0;
  }

  50% {
    width: 100%;
    margin-left: 0;
  }

  100% {
    width: 0;
    margin-left: 100%;
  }
}
</style>
