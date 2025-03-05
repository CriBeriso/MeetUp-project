<template>
  <v-dialog width="350" persistent v-model="editDialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"> Edit Date </v-btn>
    </template>
    <template v-slot:default>
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-date-picker v-model="editableDate" style="width: 100%">
              <template v-slot:actions>
                <v-btn flat @click="editDialog = false">Close</v-btn>
                <v-btn flat @click="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
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
      editableDate: null,
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getDate();
      const newMonth = new Date(this.editableDate).getMonth();
      const newYear = new Date(this.editableDate).getFullYear();
      newDate.setDate(newDay);
      newDate.setMonth(newMonth);
      newDate.setFullYear(newYear);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
    },
  },
  created() {
    this.editableDate = new Date(this.meetup.date);
  },
};
</script>
