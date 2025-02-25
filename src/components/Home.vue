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
  data () {
    return {
      meetups: [
        {imageUrl: 'https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D', id: 'NY1', title: 'Meetup in NY'},
        {imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyJUMzJUFEc3xlbnwwfHwwfHx8MA%3D%3D', id: 'PR1', title: 'Meetup in Paris'}
      ]
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