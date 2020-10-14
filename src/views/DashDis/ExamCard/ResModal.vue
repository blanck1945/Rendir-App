<template>
  <div class="modal" :class="{ 'is-active': openResModal }">
    <div class="modal-background"></div>
    <div
      class="modal-content has-background-white is-h-180 is-flex is-aligned-center bor-round-8 dir-col"
    >
      <h3 class="bold size-4">Entregar Respuesta</h3>
      <p class="mt-4 mb-2 bold">¿Quiere entregar su respuesta?</p>
      <div>
        <button class="button is-success mr-2" @click="handlerRes">
          Entregar
        </button>
        <button class="button is-danger" @click="toogleResModal">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResModal",
  props: {
    openResModal: Boolean,
    handlerRes: Function,
    toogleResModal: Function,
  },
  methods: {
    closeModal() {
      this.toogleResModal();
    },
    submitRes() {
      this.handlerRes();
    },
  },
};
</script>