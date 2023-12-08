export default {
    state: {
      user: null
    },
    mutations: {
      setUser(state, user) {
        state.user = user
      },
      logout(state) {
        state.user = null
      }
    },
    actions: {
      login({ commit }, user) {
        // Lógica de autenticación aquí (puedes usar servicios, API, etc.)
        // Después de autenticar, establece el usuario en el estado con commit('setUser', user)
      },
      register({ commit }, user) {
        // Lógica de registro aquí
        // Después de registrar, establece el usuario en el estado con commit('setUser', user)
      },
      logout({ commit }) {
        commit('logout')
      }
    },
    getters: {
      isLoggedIn: state => !!state.user
    }
  }
  