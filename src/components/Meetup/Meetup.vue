<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="text-xs-center text-sm-center">
        <v-progress-circular
          indeterminate
          color="primary"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>{{ meetup.title }}</h3>
            <template v-if="userIsCreator">
              <EditMeetupDetailsDialog
                :meetup="meetup"
              ></EditMeetupDetailsDialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>
          <v-card-subtitle
            >{{ formatDate(meetup.date) }} -
            {{ meetup.location }}</v-card-subtitle
          >
          <v-spacer></v-spacer>
          <div>
            <EditMeetupDateDialog
              :meetup="meetup"
              v-if="userIsCreator"
            ></EditMeetupDateDialog>
            <EditMeetupTimeDialog
              :meetup="meetup"
              v-if="userIsCreator"
            ></EditMeetupTimeDialog>
          </div>
          <v-card-text>{{ meetup.description }} </v-card-text>
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
import EditMeetupDateDialog from "./Edit/EditMeetupDateDialog.vue";
import EditMeetupDetailsDialog from "./Edit/EditMeetupDetailsDialog.vue";
import EditMeetupTimeDialog from "./Edit/EditMeetupTimeDialog.vue";

export default {
  props: ["id"],
  components: {
    EditMeetupDetailsDialog,
    EditMeetupDateDialog,
    EditMeetupTimeDialog,
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    formatDate(value) {
      const date = new Date(value);
      return date.toLocaleString(["es-ES"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>
