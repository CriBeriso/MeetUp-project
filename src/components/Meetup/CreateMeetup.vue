<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h3>Create a New MeetUp</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                :rules="[required]"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="imageUrl"
                v-model="imageUrl"
                required
                ></v-text-field>
            </v-col>
          </v-row>
            <!-- <v-col cols="12" sm="6" offset-sm="3"> -->
              <img :src="imageUrl" height="150">
            <!-- </v-col> -->
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="description"
                :rules="[required]"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <h4>Choose a Data and Time</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-date-picker v-model="date"></v-date-picker>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-btn 
              color="primary" 
              :disabled="!formIsValid"
              type="submit">Create Meetup</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date(),
      time: new Date()
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' 
      && this.location !== '' 
      && this.imageUrl !== '' 
      && this.description !== ''
    },
    submittableDateTime () {
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        this.date.setHours(this.time.getHours())
        this.date.setMinutes(this.time.getMinutes())
      }
      const date = this.date.toDateString()
      console.log(date)
      return date
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return 
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime,
        // time: this.time
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    }
  }
}
</script>