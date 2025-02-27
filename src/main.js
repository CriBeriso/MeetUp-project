/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


// Plugins
import { registerPlugins } from '@/plugins'
import store from './store'
import router from './router'
import App from './App.vue'
import { createApp } from 'vue'

const app = createApp(App)

app.use(router)
app.use(store)



registerPlugins(app)

app.mount('#app')

