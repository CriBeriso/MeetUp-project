<template>
  <v-dialog width="350" persistent v-model="editDialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"> Edit Time </v-btn>
    </template>
    <template v-slot:default>
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-time-picker
              v-model="editableTime"
              style="width: 100%"
              format="24hr"
            >
            </v-time-picker>
            <v-card-actions>
              <v-btn flat @click="editDialog = false">Close</v-btn>
              <v-btn flat @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableTime: null,
    };
  },
  created() {
    if (this.meetup?.date) {
      const date = new Date(this.meetup.date);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      this.editableTime = `${hours}:${minutes}`;
    }
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const hours = this.editableTime.match(/^(\d+)/)[1];
      const minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
    },
  },
};
</script>
