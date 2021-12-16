import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http/http'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        token: null
    },
    mutations: {
        DEFINE_USER(state, { user, token }) {
            state.user = user
            state.token = token
        },
        REMOVE_USER(state) {
            state.user = {}
            state.token = null
        }
    },
    actions: {
        logUser({ commit }, user) {
            return new Promise((resolve, reject) => {
                http.post("logUser", user)
                .then(response => {
                    let user = response.data
                    http.post("token", user)
                    .then(response => {
                        let token = response.data.token
                        commit("DEFINE_USER", { user, token })
                        resolve({ user, token })
                    }).catch(e => reject(e))
                })
                .catch(e => reject(e))
            })
        },
        regUser({ commit }, user) {
            return new Promise((resolve, reject) => {
                http.post("user", user)
                .then(response => {
                    resolve(response.data)
                })
                .catch(e => reject(e))
            })
        }
    },
    modules: {
    }
})
