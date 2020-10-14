<template>
  <div class="container is-fullheight mt-50">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3 mt-4">Crear una cuenta</h3>
        <form action="#" @submit.prevent="register">
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="e.g Alex Smith"
                v-model="user.name"
              />
            </div>
          </div>

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

          <div class="field">
            <label class="label">Confimar contraseña</label>
            <div class="control">
              <input
                v-model="user.confirmPass"
                class="input"
                type="password"
                placeholder="Confirmar Contraseña"
              />
            </div>
          </div>

          <div v-if="errors.error" class="notification is-danger">
            <button class="delete" @click="toogleError"></button>
            {{ errors.msg }}
          </div>

          <div v-if="succ.state" class="notification is-success">
            <button class="delete" @click="toogleSucc"></button>
            {{ succ.succMsg }}
            <router-link to="dashboard" />
          </div>

          <button type="submit" class="button is-link">Crear cuenta</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init.ts";
import * as firebase from "firebase/app";
import "firebase/auth";
import { matchPass, onSubmit, controlCheck } from "./func";
export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
      },
      errors: {
        error: false,
        msg: "",
      },
      succ: {
        state: false,
        succMsg: "",
      },
    };
  },
  methods: {
    toogleError() {
      this.errors.error = false;
    },
    toogleSucc() {
      this.succ = {
        state: false,
        succMsg: "",
      };
    },
    resetForm() {
      this.user = {
        name: "",
        email: "",
        password: "",
        confirmPass: "",
      };
    },
    setUserName(payload) {
      this.$store.dispatch("SET_USER_NAME", payload);
    },
    async register() {
      const check = controlCheck(this.user, "register");
      if (check.error) {
        this.errors = {
          error: check.error,
          msg: check.msg,
        };
      }

      const match = matchPass(this.user.password, this.user.confirmPass);

      if (!match) {
        this.errors = {
          error: true,
          msg: "La contraseña no coinciden",
        };
      }

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: this.user.name,
          });
        } else {
          return false;
        }
      });

      const data = await onSubmit(this.user, "register");

      if (data) {
        this.resetForm();
        this.succ = {
          state: true,
          succMsg: "Usuario creado con exito",
        };
        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 3000);
      }
    },
  },
};
</script>
