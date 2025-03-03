<template>
  <v-container>
    <v-row v-if="error">
      <v-col cols="12" sm="6" offset-sm="3">
        <AlertVue 
          type="error" 
          :text="error.message"
          @dismissed="onDismissed"></AlertVue>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignIn">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn 
                    type="submit"
                    :loading="loading"
                    variant="tonal"
                    >Sign in</v-btn>
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AlertVue from '../Shared/Alert.vue'
export default {
  components: {AlertVue},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined ) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onDismissed() {
      this.$store.dispatch('clearError')
    }
  }
}
</script>