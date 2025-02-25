import Home from '@/components/Home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Meetup from '@/components/Meetup/Meetup'

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/meetups', name: 'Meetups', component: Meetups},
  {path:'/meetups/:id', name: 'Meetup', component: Meetup},
  {path: '/meetup/new', name: 'CreateMeetup', component: CreateMeetup},
  {path: '/profile', name: 'Profile', component: Profile},
  {path: '/signup', name: 'Signup', component: SignUp},
  {path: '/signin', name: 'Signin', component: SignIn}
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
