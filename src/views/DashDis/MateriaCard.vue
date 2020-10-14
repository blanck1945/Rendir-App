<template>
  <div
    class="is-full-w is-flex has-background-white has-text-black is-justify-bet px-4 py-4 bor-round-4"
  >
    <div class="">
      <h2 class="size-4 bold">{{ materia.materia_name }}</h2>
    </div>
    <div class="buttons">
      <button class="button is-success" @click="takeExam">Rendir</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MateriaCard",
  props: {
    materiaProp: Object,
  },
  methods: {
    takeExam() {
      this.$router.push("/exam");
    },
  },
  data() {
    return {
      materia: this.materiaProp,
    };
  },
};
</script>
