import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getDatabase, ref, push, get, remove} from 'firebase/database';
import { parseQuery } from 'vue-router';

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return 
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      if (state.user.fbKeys && state.user.fbKeys[payload]) {
        delete state.user.fbKeys[payload]
      }
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const db = getDatabase()
      const user = getters.user

      if (!user) {
        console.error("No user found");
        commit('setLoading', false);
        return;
      }

      const userRef = ref(db, `/users/${user.id}/registrations/`)
        
      push(userRef, payload)
        .then((data) => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })

    },
    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const db = getDatabase()
      const user = getters.user

      if (!user || !user.fbKeys) {
      console.error("No user or fbKeys found");
      commit('setLoading', false);
      return;
      }

      const fbKey = user.fbKeys[payload]
      if (!fbKey) {
        console.error("No fbKey found for this meetup");
        commit('setLoading', false);
        return;
      }
      const userRef = ref(db, `/users/${user.id}/registrations/${fbKey}`)
      remove(userRef)
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })

    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          commit('setLoading', false)
          const user = userCredential.user;
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          };
            commit('setUser', newUser)
        })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        commit('setLoading', false)
        const user = userCredential.user;
        const newUser = {
          id: user.uid,
          registeredMeetups: [],
          fbKeys: {}
        };
          commit('setUser', newUser)
      })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.id,
        registeredMeetups: [],
        fbKeys: {}
      })
    },
    fetchUserData({ commit, getters }) {
      commit('setLoading', true)
      const db = getDatabase()
      const userRef = ref(db, `/users/${getters.user.id}/registrations/`)
      get(userRef)
        .then(data => {
          if (data.exists()) {
            const dataPairs = data.val()
            let registeredMeetups = []
            let swappedPairs = {}
            console.log(values)
            for (let key in dataPairs) {
              registeredMeetups.push(dataPairs[key])
              swappedPairs[dataPairs[key]] = key 
            }
            console.log(registeredMeetups)
            console.log(swappedPairs)
            const updatedUser = {
              id: getters.user.id,
              registeredMeetups: registeredMeetups,
              fbKeys: swappedPairs
            }
            commit('setLoading', false)
            commit('setUser', updatedUser)
          }
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout({commit}) {
      getAuth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
};
