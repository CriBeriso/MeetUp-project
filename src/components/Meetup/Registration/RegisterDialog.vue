<template>
  <v-dialog persistent v-model="registerDialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        {{ userIsRegistered ? "Unregister" : "Register" }}
      </v-btn>
    </template>
    <template v-slot:default>
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-card-title v-if="userIsRegistered"
              >Unregister from Meetup?</v-card-title
            >
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              You can always change your decision later on.
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
              <v-btn
                class="red--text darken-1"
                variant="text"
                @click="registerDialog = false"
                >Cancel</v-btn
              >
              <v-btn
                class="green--text darken-1"
                variant="text"
                @click="onAgree"
                >Confirm</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    },
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    },
  },
};
</script>
