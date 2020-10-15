import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disName: undefined,
    login: false,
    userExam: undefined,
    materia: "",
    res: undefined,
    materiaArr: undefined,
  },
  mutations: {
    setUserName(state, payload) {
      state.disName = payload;
    },
    toogleLogin(state) {
      state.login = true;
    },
    setLogOut(state) {
      state.login = false;
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
    SET_USER_NAME: (context, payload) => {
      context.commit("setUserName", payload);
    },
    TOOGLE_LOGIN: (context) => {
      context.commit("toogleLogin");
    },
    SET_LOG_OUT: (context) => {
      context.commit("setLogOut");
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
