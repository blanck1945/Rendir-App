<template>
  <div class="is-full-w pt-4 is-h-355 has-background-light">
    <div class="container is-h-90 has-background-white is-flex">
      <div
        class="is-flex is-aligned-center ml-4"
        v-for="(el, index) in getUserExam.userExam"
        :key="index"
      >
        <p>{{ index + 1 + "." }}</p>
        <div
          class="circle ml-2"
          :class="
            el.valorCorrecto
              ? 'has-background-success'
              : 'has-background-danger'
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GradePage",
  computed: {
    getUserExam() {
      return this.$store.getters.getState;
    },
  },
  mounted() {
    console.log("this is the state from router", this.getUserExam);
  },
};
</script>