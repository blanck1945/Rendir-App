<template>
  <div id="app">
    <Navbar />
    <main class="h_full">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
<style lang="scss">
@import "./scss/app.scss";
</style>
