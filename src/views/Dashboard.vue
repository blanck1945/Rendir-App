<template>
  <div class="is-full-w is-flex is-full-vh">
    <div class="column is-one-quarter has-background-info">
      <div
        class="div_info has-background-primary is-flex is-aligned-center pl-2 size-4 bold bor-round-4"
      >
        Comunidad Siglo
      </div>
      <div
        @click="toogleDis('exam')"
        class="div_info has-background-link my-2 has-text-white is-flex is-aligned-center pl-2 is-clickable size-4 is-hovered bor-round-4"
      >
        Examenes
      </div>
      <div
        @click="toogleDis('rules')"
        class="div_info has-background-link my-2 has-text-white is-flex is-aligned-center pl-2 is-clickable size-4 is-hovered bor-round-4"
      >
        Reglas
      </div>
      <div
        class="div_info has-background-link my-2 has-text-white is-flex is-aligned-center pl-2 is-clickable size-4 is-hovered bor-round-4"
      >
        Opciones
      </div>
    </div>
    <template v-if="dis === 'exam'">
      <div
        v-if="materias.length === 0"
        class="has-background-light is-full-w is-flex is-justified-center is-aligned-center"
      >
        <pulse-loader :size="size"></pulse-loader>
      </div>
      <div
        v-for="(el, index) in materias"
        :key="index"
        class="column is-three-quarters has-background-light"
      >
        <MateriaCard :materiaProp="el" />
      </div>
    </template>

    <Rules v-if="dis === 'rules'" />
  </div>
</template>

<script>
import { database } from "../firebase/init";
import MateriaCard from "./DashDis/MateriaCard";
import Rules from "./DashDis/Rules";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Dashboard",
  components: { MateriaCard, Rules, PulseLoader },
  data() {
    return {
      materias: [],
      dis: "exam",
      size: "2rem",
    };
  },
  methods: {
    setMateriaArr(payload) {
      this.$store.dispatch("SET_MATERIA_ARR", payload);
    },
    getData() {
      database
        .collection("materias")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((docs) => this.materias.push(docs.data()));
        });
      this.setMateriaArr(this.materias);
    },
    toogleDis(view) {
      this.dis = view;
    },
  },
  computed: {
    getState() {
      return this.$store.getters.getState;
    },
  },
  created() {
    if (this.getState.materiaArr === undefined) {
      this.getData();
    } else {
      this.materias = this.getState.materiaArr;
    }
  },
};
</script>
