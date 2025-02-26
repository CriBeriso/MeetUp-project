<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{meetup.title}}
          </v-card-title>
          <v-img
              :src="meetup.imageUrl"
              height="400px"
          ></v-img>
          <v-card-subtitle>{{meetup.date}}- Where it takes place</v-card-subtitle>
          <v-card-text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate velit dolorum facere totam, dignissimos quas, expedita, eveniet impedit nihil odit aperiam culpa libero! Quis, fugit sapiente nam doloribus dolore saepe.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>