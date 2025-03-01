/**
 * main.js
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Plugins
import { registerPlugins } from '@/plugins'
import store from './store'
import router from './router'
import App from './App.vue'
import { createApp } from 'vue'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyBgC8C2GhirAGpjrP4nqssyXqlpwlD9Hw8',
  authDomain: 'meetupproject-5e537.firebaseapp.com',
  projectId: 'meetupproject-5e537',
  storageBucket: 'meetupproject-5e537.firebasestorage.app',
  messagingSenderId: '823958977209',
  appId: '1:823958977209:web:8f0b08ca587d4d5e0c3968'
};
const firebase = initializeApp(firebaseConfig);
const app = createApp(App)
app.config.globalProperties.$filters = {
  dateFormat (value) {
    const date = new Date(value)
    return date.toLocaleString(['es-ES'], {month: 'short',  day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
  }
}


app.use(router)
app.use(store)

registerPlugins(app)

app.mount('#app')

