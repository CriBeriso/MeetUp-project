<template>
  <v-dialog width="350" persistent>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon>
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
    </template>
    <template v-slot:default>
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-card-title>Edit Meetup</v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="editedTitle"
                required
              ></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                required
              ></v-textarea>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card-actions>
              <v-btn variant="text" @click="dialog = false">Close</v-btn>
              <v-btn variant="text" @click="onSaveChanges">Save</v-btn>
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
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
      this.dialog = false;
    },
  },
};
</script>
