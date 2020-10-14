import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    disName: "",
    login: false,
    userExam: undefined,
  },
  mutations: {
    setLoginUser(state, payload) {
      state.login = !state.login;
      state.disName = payload;
    },
    setUserExam(state, payload) {
      state.userExam = payload;
    },
  },
  actions: {
    SET_LOGIN_USER: (context, payload) => {
      context.commit("setLoginUser", payload);
    },
    SET_USER_EXAM: (context, payload) => {
      context.commit("setUserExam", payload);
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
