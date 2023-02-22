<template>
  <main>
    <DashboardComponent />
  </main>
</template>

<script>
import DashboardComponent from './components/DashboardComponent.vue'

export default {
  name: 'App',
  components: {
    DashboardComponent
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/colors';
  body {
    margin:0;
    background-color: $secondary-black;
  }

  main {
    background-color: $secondary-black;
  }
</style>
