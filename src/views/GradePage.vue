<template>
  <div
    class="is-full-w pt-4 is-h-355 has-background-light exam_div is-aligned-center"
  >
    <h2 class="title is-full-w is-flex is-justified-center">Resultado</h2>
    <div class="is-w-75 is-h-90 has-background-white is-flex">
      <div
        class="is-flex is-aligned-center ml-4"
        v-for="(el, index) in getState.userExam"
        :key="index"
      >
        <p>{{ index + 1 + "." }}</p>
        <div
          class="circle ml-2 is-clickable"
          :class="getResColor(el.valorCorrecto)"
        ></div>
      </div>
    </div>
    <div
      class="is-w-75 is-h-90 has-background-white is-flex is-aligned-center is-justified-center my-4"
    >
      <div
        class="has-background-success circle circle-fix ml-2 is-flex is-aligned-center is-justified-center mr-4 has-text-white"
      >
        {{ getCorrect }}
      </div>
      <div
        class="has-background-danger circle circle-fix is-flex is-aligned-center is-justified-center has-text-white"
      >
        {{ getWrong }}
      </div>
      <div class="is-flex is-aligned-center ml-25">
        <p class="mr-2">Su nota es</p>
        <div
          class="has-background-info circle circle-fix-big is-flex is-aligned-center is-justified-center has-text-white size-4"
        >
          {{ getGrade }}
        </div>
      </div>
    </div>
    <div class="is-w-75 is-h-355 has-background-white mb-4">
      <h3 class="bold ml-4 mt-2">Correción</h3>
      <div
        class="has-background-info has-text-white my-4 px-2"
        v-for="(el, index) in getResJust"
        :key="index"
      >
        <h3 class="bold">{{ el.preguntaTitulo }}</h3>
        <p class="py-2">{{ el.justificacionRes }}</p>
      </div>
      <div class="is-flex is-justified-center">
        <button class="button is-link" @click="postGrade">
          Finalizar Examen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../firebase/init";
import { getCircleColor, calGrade, rateGrade } from "./colorFunc";
export default {
  name: "GradePage",
  data() {
    return {
      correctNum: 0,
      wrong: undefined,
      justArr: [],
      grade: 0,
    };
  },
  methods: {
    setCorrectNum(num) {
      this.correctNum = num;
    },
    setWrongArr(arr) {
      this.wrong = arr;
    },
    getResColor(color) {
      return getCircleColor(color);
    },
    setJustArr(arr) {
      this.justArr = arr;
    },
    setGrade(grade) {
      this.grade = grade;
      return grade;
    },
    async postGrade() {
      const newGrade = {
        nombreEstudiante: this.getState.disName,
        materia: this.getState.materia,
        nota: this.grade,
        estado: rateGrade(this.grade),
      };
      await database.collection("notas").add(newGrade);
      this.$router.push("/");
    },
  },
  computed: {
    getState() {
      return this.$store.getters.getState;
    },
    getResJust() {
      const justArr = [];
      this.wrong.map((res) =>
        this.getState.res.map((el) =>
          el.preguntaId === res.preguntaId
            ? justArr.push({ ...res, justificacionRes: el.justificacionRes })
            : null
        )
      );
      return justArr;
    },
    getCorrect() {
      const correctArr = this.getState.userExam.filter((el) => {
        return el.valorCorrecto;
      });
      return correctArr.length;
    },
    getWrong() {
      const wrongArr = this.getState.userExam.filter((el) => {
        return !el.valorCorrecto;
      });
      console.log(wrongArr);
      this.setCorrectNum(wrongArr.length);

      this.setWrongArr(wrongArr);
      return wrongArr.length;
    },
    getGrade() {
      const grade = this.correctNum === 0 ? 0 : this.correctNum * 3.33;
      if (grade.length === 1) {
        return this.setGrade(grade);
      } else {
        return this.setGrade(calGrade(grade));
      }
    },
  },
};
</script>