import {createStore} from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { getDatabase, ref, push, get, update, remove} from 'firebase/database';
import { parseQuery } from 'vue-router';

const store = createStore({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D',
        id: 'NY1',
        title: 'Meetup in NY',
        date: new Date(),
        location: 'New York',
        description: 'It\'s New York!'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyJUMzJUFEc3xlbnwwfHwwfHx8MA%3D%3D',
        id: 'PR1',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
    user: null,
    loading: false,
    error: null
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
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetupData(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
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
    loadMeetups ({commit}) {
      commit('setLoading', true)
      const db = getDatabase();
      const meetupRef = ref(db, "meetups")
      get(meetupRef)
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for(let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      const db = getDatabase();
      const meetupRef = ref(db, "meetups")
      push(meetupRef, meetup)
        .then((data) => {
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      const db = getDatabase();
      const meetupRef = ref(db, 'meetups/' + payload.id)
      update(meetupRef, updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetupData', payload)
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
    logout({commit}) {
      getAuth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
});

export default store