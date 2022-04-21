<template>
  <div>
    <Navbar></Navbar>
    <div class="app">
      <Sidebar></Sidebar>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
}
</script>

<style lang="scss" scoped>
*{
  background: rgb(235, 232, 232);
}
.app{
  display: flex;
  flex-direction: row;
}
</style>