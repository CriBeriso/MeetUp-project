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

