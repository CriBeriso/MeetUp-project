import { getDatabase, ref, push, get, update, remove} from 'firebase/database';
import { parseQuery } from 'vue-router';

export default {
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
    ]
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
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
    }
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true)
      const db = getDatabase();
      const meetupRef = ref(db, "meetups")
      get(meetupRef)
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
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
    createMeetup({ commit, getters }, payload) {
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
  },
    getters: {
      loadedMeetups(state) {
        return state.loadedMeetups.sort((meetupA, meetupB) => {
          return meetupA.date > meetupB.date
        })
      },
      featuredMeetups(state, getters) {
        return getters.loadedMeetups.slice(0, 5)
      },
      loadedMeetup(state) {
        return (meetupId) => {
          return state.loadedMeetups.find((meetup) => {
            return meetup.id === meetupId
          })
        }
      },
    }
  }
