import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    // apiUrl: 'http://localhost:3000/api',
    apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
    username: null,
    userId: null,
    isAdmin: false,
  },
  mutations: {
    authenticate(state){
      state.isLoggedIn = auth.isLoggedIn();
      if(state.isLoggedIn){
        state.username = auth.getUsername();
        state.userId = auth.getUserId();
        state.isAdmin = auth.getUserAdmin();
      }
      else{
        state.username = null;
        state.userId = null;
        state.isAdmin = false;
      }
    }
  },
  actions: {
    authenticate(context){
      context.commit('authenticate');
    }
  }
})
