import {createStore} from 'vuex'
import meetup from './meetup'
import user from './user'
import shared from './shared';

const store = createStore({
  modules: {
    meetup: meetup,
    user: user,
    shared: shared
  }
});

export default store