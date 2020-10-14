<template>
  <div class="exam_div border-top">
    <EndModal
      :openEndModal="openEndModal"
      :toogleFalseModal="toogleEndModal"
      :finishExam="finishExam"
    />
    <div class="modal" :class="{ 'is-active': openModal }">
      <div class="modal-background"></div>
      <div
        class="modal-content has-background-white is-h-180 is-flex is-aligned-center bor-round-8 dir-col"
      >
        <h3 class="bold size-4">Entregar Respuesta</h3>
        <p class="mt-4 mb-2 bold">¿Quiere entregar su repsuesta?</p>
        <div>
          <button class="button is-success mr-2" @click="handlerRes">
            Entregar
          </button>
          <button class="button is-danger" @click="toogleModal">
            Cancelar
          </button>
        </div>
      </div>
      <button
        class="modal-close is-large"
        @click="toogleModal"
        aria-label="close"
      ></button>
    </div>
    <div class="is-flex border-bot border-r">
      <div class="is-w-50 is-h-355 div_fix border-r">
        <div
          class="question_row pb-2 border-bot px-2 is-clickable"
          @click="setQuestionId(index)"
          v-for="(el, index) in questions"
          :key="index"
        >
          <h4 class="is-h-30 mt-2">
            {{ el.preguntaTitulo }}
          </h4>
          <div
            class="circle mt-2 has-background-white"
            :class="getColorValue(el.preguntaEstado)"
          ></div>
        </div>
      </div>
      <div class="is-h-355 is-w-50">
        <h2
          class="bold size-4 is-h-55 is-flex is-justified-center is-aligned-center is-text-align has-text-link"
        >
          Respuetas
        </h2>
        <div class="is-flex is-justified-center">
          <div class="is-flex is-justified-center mr-6">
            <p class="mr-2 bold">Alumno:</p>
            <p>{{ getName }}</p>
          </div>
          <div class="is-flex is-justified-center">
            <p class="mr-2 bold">Materia:</p>
            <p>{{}}</p>
          </div>
        </div>
        <div class="is-flex">
          <div
            class="is-flex is-aligned-center ml-2 px-2 py-2"
            v-for="(el, index) in questions"
            :key="index"
          >
            <p class="mr-2">{{ index + 1 + "." }}</p>
            <div
              class="circle is-clickable"
              :class="getColorValue(el.preguntaEstado)"
            ></div>
          </div>
        </div>
        <div class="timer_div">Timer</div>
        <div class="is-full-w is-flex is-aligned-center is-justified-center">
          <button class="button is-success" @click="toogleEndModal">
            Terminar Examen
          </button>
        </div>
      </div>
    </div>
    <div
      class="is-full-w res_div"
      v-for="(el, index) in questionDis"
      :key="index"
    >
      <div class="bold border-bot pl-4 size-4">{{ el.preguntaTitulo }}</div>
      <ol
        class="border-bot is-clickable"
        v-for="(res, resInd) in el.preguntaRes"
        :key="resInd"
      >
        <li
          @click="setUserRes(el, resInd)"
          class="pl-4"
          :class="
            el.userRes === resInd
              ? 'has-background-info has-text-white pl-4 py-2'
              : 'pl-4 py-2'
          "
        >
          {{ resInd + 1 + ". " + res }}
        </li>
      </ol>
      <div class="is-flex my-2 pl-4">
        <button class="button is-info" @click="toogleModal">
          Entregar Respuesta
        </button>
        <div>
          <input @change="toogleReview" type="checkbox" class="ml-4 mt-4" />
          <label class="ml-2">Marcar para revisar</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../../../firebase/init";
import { getColorFunc } from "./funcs";
import { fetchRes, checkExam, populateRes } from "./examEndFunc";
import EndModal from "./EndModal";
export default {
  name: "ExamDis",
  components: {
    EndModal,
  },
  data() {
    return {
      questions: [],
      questionID: 0,
      questionDis: [],
      openModal: false,
      openEndModal: false,
      toRewview: false,
      toogleFalseModal: () => this.openModal(false),
    };
  },
  computed: {
    getName() {
      return this.$store.getters.getName;
    },
  },
  methods: {
    async getQuestions() {
      const data = await database.collection("preguntas").get();
      data.docs.forEach((doc) => this.questions.push(doc.data()));
      this.questionDis.push(this.questions[0]);
    },
    setQuestionId(id) {
      const materia = this.questions.filter((el, index) =>
        index === id ? el : null
      );
      this.setQuestionDis(materia);
    },
    setQuestionDis(materia) {
      this.questionDis = materia;
    },
    toogleModal() {
      this.openModal = !this.openModal;
    },
    toogleEndModal() {
      this.openEndModal = !this.openEndModal;
    },
    getColorValue(control) {
      return getColorFunc(control);
    },
    toogleReview() {
      this.toRewview = !this.toRewview;
    },
    async finishExam() {
      const res = await fetchRes();
      const populatedData = populateRes(this.questions);
      const examGrade = await checkExam(res, populatedData);
      this.$store.dispatch("SET_USER_EXAM", examGrade);
      this.$router.push({ name: "Finish" });
    },
    handlerRes() {
      this.changeQuestionCircle();
      this.updateQuestion(this.questionDis[0].preguntaId + 1);
      this.openModal = false;
    },
    changeQuestionCircle() {
      if (!this.toRewview) {
        this.questions = this.questions.map((el) =>
          el.preguntaId === this.questionDis[0].preguntaId
            ? { ...el, preguntaEstado: "succ" }
            : el
        );
      } else {
        this.questions = this.questions.map((el) =>
          el.preguntaId === this.questionDis[0].preguntaId
            ? { ...el, preguntaEstado: "review" }
            : el
        );
      }
    },
    updateQuestion(id) {
      const newQuestion = this.questions.filter((el, index) =>
        el.preguntaId === id ? el : null
      );
      if (newQuestion.length === 0) {
        console.log(this.questions[0]);
        this.setQuestionDis([this.questions[0]]);
      } else {
        this.setQuestionDis(newQuestion);
      }
    },
    setUserRes(question, res) {
      this.questions = this.questions.map((el) =>
        el.preguntaTitulo === question.preguntaTitulo
          ? { ...question, userRes: res }
          : el
      );

      const newQuestion = this.questions.filter((el) =>
        el.preguntaTitulo === question.preguntaTitulo
          ? { ...question, userRes: res }
          : null
      );

      this.setQuestionDis(newQuestion);
    },
  },
  mounted() {
    this.getQuestions();
  },
};
// @click="setUserRes(el, resInd)"
</script>
