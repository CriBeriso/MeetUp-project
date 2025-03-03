<template>
  <v-container>
    <v-row >
      <v-col cols="12" sm="6" class="text-xs-center text-sm-right">
        <v-btn size="large" to="/meetups" color="primary">Explore MeetUps</v-btn>
      </v-col>
      <v-col cols="12" sm="6" class=" text-xs-center text-sm-left">
        <v-btn size="large" to="/meetup/new" color="primary">Organize MeetUp</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-xs-center text-sm-center">
        <v-progress-circular 
        indeterminate 
        color="primary" 
        :width="7" 
        :size="70" 
        v-if="loading"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="!loading">
      <v-col cols="12" sm="6" >
        <v-carousel class="carrousel">
          <v-img 
          v-for="meetup in meetups" 
          v-bind:src="meetup.imageUrl" 
          :key="meetup.id"
          @click="onLoadMeetup(meetup.id)">
          <div class="title">{{meetup.title}}</div>
          </v-img>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>Join our awesome meetups!</p>
      </v-col>
    </v-row>
   
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetups/' + id);
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 10px;
}

.carrousel {
  cursor: pointer;
}
</style>