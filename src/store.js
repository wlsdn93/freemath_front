import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        status: null,
        access_token: localStorage.getItem("access_token")
    },
    mutations: {
        setStatus(state, status) {
            return state.status = status;
        }
    },

});
