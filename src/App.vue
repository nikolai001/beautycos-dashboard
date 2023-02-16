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
  }

  main {
    display:flex;
    height:100vh;
    background-color:$primary-white;
    justify-content: center;
    align-items: center;
  }
</style>
