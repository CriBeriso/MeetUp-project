<template>
  <v-app>
    
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-item 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          {{item.title}}
        </v-list-item>
        <v-list-item 
        v-if="userIsAuthenticated"
        @click="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          Logout
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary">
      <v-app-bar-nav-icon 
      @click="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" cursor="pointer" class="text-white text-decoration-none">MeetUp</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn 
        variant="text" 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-icon start>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn
        v-if="userIsAuthenticated"
        @click="onLogout" 
        flat
        variant="text">
          <v-icon start>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
      
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'mdi-account-plus', title: 'Sign up', link: '/signup'},
        { icon: 'mdi-login', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-account-supervisor', title: 'View Meetups', link: '/meetups'},
          { icon: 'mdi-newspaper-plus', title: 'Organize Meetup', link: '/meetup/new'},
          { icon: 'mdi-account', title: 'Profile', link: '/profile'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
