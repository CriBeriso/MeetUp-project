<template>
 <v-container>
  <v-row v-for="meetup in meetups" :key="meetup.id" class="mb-2">
    <v-col cols="12" xs="12" sm="10" md="8" offset-sm="1" offset-md="2">
      <v-card class="info" color="accent" >
        <v-container fluid>
          <v-row>
            <v-col cols="5" sm="4" md="3">
              <v-img
              :src="meetup.imageUrl"
              height="130px"
              ></v-img>
            </v-col>
            <v-col cols="7" sm="8" md="9">
              <v-card-title class="white--text">{{meetup.title}}</v-card-title>
              <v-card-subtitle>{{$filters.dateFormat(meetup.date) }}</v-card-subtitle>
              <v-card-actions>
                <v-btn variant="flat" color="secondary" :to="'/meetups/' + meetup.id">
                  <v-icon start>mdi-arrow-right-circle</v-icon>
                  View MeetUp</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
 </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>