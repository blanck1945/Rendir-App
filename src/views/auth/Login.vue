<template>
  <div class="container is-fullheight mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3 mt-4">Iniciar Sesión</h3>
        <form action="#" @submit.prevent="login">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="user.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control">
              <input
                v-model="user.password"
                class="input"
                type="password"
                placeholder="password"
              />
            </div>
          </div>

          <div v-if="errors.error" class="notification is-danger">
            <button class="delete" @click="toogleError"></button>
            {{ errors.msg }}
          </div>

          <button type="submit" class="button is-link">Crear cuenta</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "firebase/auth";
import { onSubmit, controlCheck } from "./func";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {
        error: false,
        msg: "",
      },
    };
  },
  methods: {
    setLoginUser() {
      this.$store.dispatch("SET_LOGIN_USER");
    },
    toogleError() {
      this.errors.error = false;
    },
    async login() {
      const check = controlCheck(this.user, "login");

      if (check.error) {
        return (this.errors = {
          error: check.error,
          msg: check.msg,
        });
      }
      const userLog = await onSubmit(this.user, "login");
      if (userLog.user) {
        this.setLoginUser(this.user.email);
        this.$router.push({ name: "Dashboard" });
      }
      this.errors = {
        error: true,
        msg: userLog,
      };
    },
  },
};
</script>
