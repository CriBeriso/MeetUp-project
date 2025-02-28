/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VTimePicker } from 'vuetify/labs/components'


// Composables
import { createVuetify } from 'vuetify'

const myCustomTheme = {
  colors: {
    primary: '#4CAF50',  // Verde
    secondary: '#FFC107', // Amarillo
    accent: '#FF5722',    // Naranja
    background: '#F5F5F5',
    surface: '#FFFFFF'
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VTimePicker,
  },
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme: myCustomTheme
    }
  },
})
