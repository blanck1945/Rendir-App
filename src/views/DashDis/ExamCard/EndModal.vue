<template >
  <div class="modal" :class="{ 'is-active': openEndModal }">
    <div class="modal-background"></div>
    <div class="modal-content has-background-white is-h-120 bor-round-8">
      <h3
        class="size-4 bold is-full-w is-flex is-aligned-center is-h-55 is-justified-center"
      >
        ¿Desea terminar el examen?
      </h3>
      <div class="is-flex is-justified-evenly">
        <button class="button is-success" @click="endExam">
          Terminar examen
        </button>
        <button class="button is-danger" @click="closeModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EndModal",
  props: {
    openEndModal: Boolean,
    toogleFalseModal: Function,
    finishExam: Function,
  },
  methods: {
    closeModal() {
      this.toogleFalseModal();
    },
    endExam() {
      this.finishExam();
    },
  },
};
</script>