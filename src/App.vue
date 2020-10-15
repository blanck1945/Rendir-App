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
import * as firebase from "firebase";
export default {
  components: {
    Navbar,
    Footer,
  },
  computed: {
    getState() {
      return this.$store.getters.getState;
    },
  },
  methods: {
    async setLoginByUser() {
      const user = await firebase.auth().currentUser;
      if (user) {
        this.$store.dispatch("TOOGLE_LOGIN");
        console.log(user.displayName);
        this.checkNameDis(user.displayName);
      } else {
        return;
      }
    },
    async checkNameDis(name) {
      if (this.getState.disName === undefined) {
        this.$store.dispatch("SET_USER_NAME", name);
      }
    },
  },
  mounted() {
    this.setLoginByUser();
  },
};
</script>
<style lang="scss">
@import "./scss/app.scss";
</style>
