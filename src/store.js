import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        status: '',
        statusText: '상태',
        subject: '',
        subjectText: '과목',
        difficulty: '',
        difficultyText: '난이도',
        accessToken: localStorage.getItem("access_token")
    },
    mutations: {
        setStatus(state, status) {
            return state.status = status;
        },
        setSubject(state, subject) {
            return state.subject = subject;
        },
        setDifficulty(state, difficulty) {
            return state.difficulty = difficulty;
        },
        setStatusText(state, statusText) {
            return state.statusText = statusText;
        },
        setSubjectText(state, subjectText) {
            return state.subjectText = subjectText;
        },
        setDifficultyText(state, difficultyText) {
            return state.difficultyText = difficultyText;
        },
    },

});
