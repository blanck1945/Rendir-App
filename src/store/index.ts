import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disName: "",
    login: false,
    userExam: undefined,
    materia: "",
    res: undefined,
    materiaArr: undefined,
  },
  mutations: {
    setLoginUser(state, payload) {
      state.login = !state.login;
      state.disName = payload;
    },
    setUserExam(state, payload) {
      state.userExam = payload;
    },
    setMateriaName(state, payload) {
      state.materia = payload;
    },
    setMateriaArr(state, payload) {
      state.materiaArr = payload;
    },
    setRes(state, payload) {
      state.res = payload;
    },
  },
  actions: {
    SET_LOGIN_USER: (context, payload) => {
      context.commit("setLoginUser", payload);
    },
    SET_USER_EXAM: (context, payload) => {
      context.commit("setUserExam", payload);
    },
    SET_MATERIA_NAME: (context, payload) => {
      context.commit("setMateriaName", payload);
    },
    SET_MATERIA_ARR: (context, payload) => {
      context.commit("setMateriaArr", payload);
    },
    SET_RES_ARR: (context, payload) => {
      context.commit("setRes", payload);
    },
  },
  modules: {},
  getters: {
    getName: (state) => {
      return state.disName;
    },
    getUserState: (state) => {
      return state.login;
    },
    getState: (state) => {
      return state;
    },
  },
});
