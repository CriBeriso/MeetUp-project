/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import store from '@/store'
import { createVuetify } from 'vuetify'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

export default createVuetify({
  components: {
    VTimePicker
  }
})
export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(store)
}
