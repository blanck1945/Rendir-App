<template>
  <div
    class="is-full-w is-aligned-center is-justified-center is-flex has-background-light"
  >
    <Rules v-if="rules" :btn="true" :rules="rules" :toogleRules="toogleRules" />
    <ExamDis v-if="!rules" />
    <div></div>
  </div>
</template>

<script>
import Rules from "./Rules";
import ExamDis from "./ExamCard/ExamDis";
export default {
  name: "Exam",
  data() {
    return {
      rules: true,
      toogleRules: () => (this.rules = false),
    };
  },
  components: {
    Rules,
    ExamDis,
  },
};
</script>
