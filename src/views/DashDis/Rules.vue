<template>
  <div
    class="column is-three-quarters has-background-white has-background-light px-6"
  >
    <h2 class="title">Reglas de Examen</h2>
    <div class="">
      <div
        class="size-4 has-background-link has-text-white px-4 py-2 bor-round-4 is-full-w"
      >
        Generales
      </div>
      <div class="content has-background-white py-2 bor-round-4 is-full-w">
        <h4 class="size-4 pl-4 has-text-info">
          Disposiciones Generales. Favor de leer con atención
        </h4>
        <ol type="1">
          <li class="my-3 bold">Cada alumno tendra 60 minutos para rendir</li>
          <li class="my-3 bold">
            Esta prohibido tener a mano cualquier elemento no habilitado al
            momento de rendir
          </li>
          <li class="my-3 bold">
            Es obligatorio tener la camara prendida en todo momento. En caso de
            no hacerlo se le llamara la atención al alumno para que corriga el
            error
          </li>
          <li class="my-3 bold">
            Cualquier controversia queda a criterio del examinador
          </li>
        </ol>
      </div>
      <div
        class="size-4 has-background-primary has-text-white px-4 py-2 bor-round-4 is-full-w"
      >
        Modalidad
      </div>
      <div class="content has-background-white py-4 bor-round-4">
        <h4 class="size-4 pl-4 has-text-primary">
          Debido a la situación de publico conocimiento la universidad tomo la
          determinación de permitir el 100% de los examenes de manera virtual. A
          continuación se detalla la modalidad para rendir
        </h4>
        <ol type="1">
          <li class="my-3 bold">
            Cada alumno debera rendir por la plataforma zoom, con una camara
            apuntando directa o de costado. Aceptar la posición de la camara
            queda a criterio del examinador
          </li>
          <li class="my-3 bold">
            Segun la materia en cuestión, se podra habilitar el uso de
            calculadora para rendir
          </li>
          <li class="my-3 bold">
            Esta prohibido levantarse en el examen sin indicar la situación al
            examinador
          </li>
          <li class="my-3 bold">
            Ante la aparición de cualquier persona ajena, se debe notificar al
            examinador la razón de la presencia de dicha persona
          </li>
        </ol>
      </div>
      <div
        class="size-4 has-background-danger has-text-white px-4 py-2 bor-round-4 is-full-w"
      >
        Aclaraciones
      </div>
      <div class="content has-background-white py-4 bor-round-4">
        <h4 class="bold has-text-danger size-4 pl-4">
          Cualquier controversia sera derimida por el examinador. Por favor le
          pedimos su coolaboración para llevar a cabo el examen.
        </h4>
        <ol>
          <li class="my-3 bold">
            Le pedimos que silencie su telefono y le recomendamos que deje
            abierto el del zoom para escuchar en caso de que el examinador
            quiere comunicarse con usted
          </li>
          <li class="my-3 bold">
            Tenga su DNI a mano para mostrarlo y no demorar el tiempo de
            acreditación
          </li>
        </ol>
      </div>
      <div
        v-if="btn"
        class="is-justified-center is-aligned-center is-flex dir-col is-w-30 m-auto"
      >
        <div class="is-justified-center is-flex mb-4">
          <input type="checkbox" class="mt-1-5" @click="toogleAcept" />
          <label class="ml-4">Acepto estas condiciones</label>
        </div>
        <div class="notification is-danger" v-if="error">
          <button @click="toogleDelete" class="delete"></button>
          {{ error }}
        </div>
        <button class="button is-success" @click="submitForm">Rendir</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rules",
  data() {
    return {
      aceptRules: false,
      error: "",
    };
  },
  props: {
    btn: Boolean,
    rules: Boolean,
    toogleRules: Function,
  },
  methods: {
    toogleDelete() {
      this.error = "";
    },
    toogleAcept() {
      this.aceptRules = true;
    },
    submitForm() {
      if (this.aceptRules) {
        this.toogleRules();
      }

      this.error = "Debe aceptar las condiciones para rendir";
    },
  },
};
</script>
