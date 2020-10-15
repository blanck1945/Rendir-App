<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <h3 class="title is-3">Rendir</h3>
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        :class="{ 'is-active': isOpen }"
        @click.prevent="toogleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isOpen }"
    >
      <div class="navbar-start">
        <a
          class="navbar-item"
          href="https://ecampus.uesiglo21.edu.ar/menu/index.zul"
        >
          Campus Virtual
        </a>

        <a class="navbar-item" href="https://21.edu.ar/"> Siglo </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Màs </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" href="https://21.edu.ar/content/empresas">
              Empresas
            </a>
            <a class="navbar-item" href="https://21.edu.ar/programas">
              Programas
            </a>
            <a
              class="navbar-item"
              href="https://21.edu.ar/content/contacto-siglo-21"
            >
              Contacto
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Reportar un error</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <template v-if="getState.login">
            <div
              class="dropdown"
              :class="{ 'is-active': isDropOpen }"
              @click="toogleDrop"
            >
              <div class="dropdown-trigger">
                <button
                  class="button"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                >
                  <span>{{ "Bievenida " + getState.disName }}</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <router-link to="/dashboard" class="dropdown-item">
                    Dashboard
                  </router-link>
                  <hr class="dropdown-divider" />
                  <a @click="logOut" href="#" class="dropdown-item">
                    Cerrar Sesión
                  </a>
                </div>
              </div>
            </div>
          </template>

          <template v-if="!getState.login">
            <div class="buttons">
              <router-link to="/register" class="button is-link">
                <strong>Registrarme</strong>
              </router-link>
              <router-link to="/login" class="button is-light">
                Iniciar Sesiòn
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      isOpen: false,
      isDropOpen: false,
      userState: false,
      user: undefined,
    };
  },
  methods: {
    toogleMenu() {
      this.isOpen = !this.isOpen;
    },
    toogleDrop() {
      this.isDropOpen = !this.isDropOpen;
    },
    toogleLogState() {
      this.$store.dispatch("SET_LOG_OUT");
    },
    async logOut() {
      await firebase.auth().signOut();
      this.toogleLogState();
      this.$router.push({ name: "Home" });
    },
  },
  computed: {
    getState() {
      return this.$store.getters.getState;
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.toogleLogState(user.displayName);
      } else {
        this.userState = false;
        this.user = undefined;
      }
    });
  },
};
</script>
