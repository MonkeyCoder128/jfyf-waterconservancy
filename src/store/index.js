import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visitedView: [{
      name: "realtimeMnitor",
      fullPath: "/realtimeMnitor/realtime",
      path: "/realtimeMnitor/realtime",
      meta: { keepAlive: false, title: '实时监测' },
      query: ''
    }],
    username:'',
    password:''
  },
  mutations: {
    addVisitedView(state, view) {
      if (state.visitedView.some(v => v.path === view.path)) return
      state.visitedView.push(view)
    },
    delVisitedView(state, view) {
      for (const [i, v] of state.visitedView.entries()) {
        if (v.path === view.path) {
          state.visitedView.splice(i, 1)
          break
        }
      }
    }
  },
  getters: {
    username: state => state.username,
    password: state => state.password,
  }
})
