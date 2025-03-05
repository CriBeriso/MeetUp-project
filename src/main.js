/**
 * main.js
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Plugins
import { registerPlugins } from '@/plugins'
import { initializeApp } from "firebase/app"
import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import AlertCmp from '@/components/Shared/Alert.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import EditMeetupDetailsDialog from '@/components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from '@/components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from '@/components/Meetup/Edit/EditMeetupTimeDialog.vue'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey) {
  console.error("⚠️ Error: Firebase API Key no encontrada. Verifica tu archivo .env");
} else {
  initializeApp(firebaseConfig);
}

getAuth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch('autoSignIn', user)
  }
})

const app = createApp(App)

app.use(router).use(store).use('app-alert', AlertCmp).use('app-edit-meetup-details-dialog', EditMeetupDetailsDialog).use('app-edit-meetup-date-dialog', EditMeetupDateDialog).use('app-edit-meetup-time-dialog', EditMeetupTimeDialog)

registerPlugins(app)

store.dispatch('loadMeetups')

app.mount('#app')

