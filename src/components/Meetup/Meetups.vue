<template>
 <v-container>
  <v-row>
    <v-col cols="12" xs="12" sm="10" md="8" offset-sm="1" offset-md="2">
      <v-card class="info" color="accent">
        <v-container fluid>
          <v-row>
            <v-col cols="5" sm="4" md="3">
              <v-img
              src="https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D"
              height="130px"
              ></v-img>
            </v-col>
            <v-col cols="7" sm="8" md="9">
              <v-card-title class="white--text">My MeetUp</v-card-title>
              <v-card-subtitle>17th July 2017</v-card-subtitle>
              <v-card-actions>
                <v-btn variant="flat" color="secondary" to="/meetups/1">
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