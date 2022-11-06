import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    users: [],
    followers: [],
    following: [],
    blocked: [],
    username: null, // Username of the logged in user
    password: null,
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setPassword(state, password) {
      state.password = password;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFriends(state) {
      const followersRes = await fetch('/api/friends/FOLLOWER').then(async r => r.json());
      const followingRes = await fetch('/api/friends/FOLLOWING').then(async r => r.json());
      const blockedRes = await fetch('/api/friends/BLOCKED').then(async r => r.json());
      var followerIds = []
      var followingIds = []
      var blockedIds = []      
      var followerUsernames = []
      var followingUsernames = []
      var blockedUsernames = []
      const followers = followersRes.reponse;
      const following = followingRes.response;
      const blocked = blockedRes.response;
      if (followers != null){
        for (const friend of followers) {
          followerIds.push(friend.userB);
          const fullUser = await fetch('/api/users/id', 
            {method: 'POST', 
            body: JSON.stringify({userId: friend.userB}), 
            headers: {'Content-Type': 'application/json'}}
          ).then(async r => r.json());
          followerUsernames.push(fullUser.user.username);
        }
      }
      if (following != null){
        for (const friend of following) {
          followingIds.push(friend.userB);
          const fullUser = await fetch('/api/users/id', 
            {method: 'POST', 
            body: JSON.stringify({userId: friend.userB}), 
            headers: {'Content-Type': 'application/json'}}
          ).then(async r => r.json());
          followingUsernames.push(fullUser.user.username);
        }
      } 
      if (blocked != null){
        for (const friend of blocked) {
          blockedIds.push(friend.userB);
          const fullUser = await fetch('/api/users/id', 
            {method: 'POST', 
            body: JSON.stringify({userId: friend.userB}), 
            headers: {'Content-Type': 'application/json'}}
          ).then(async r => r.json());
          blockedUsernames.push(fullUser.user.username);
        }
      } 
      console.log('ids from state update', followerIds, followingIds, blockedIds);
      console.log('usernames from state update', followerUsernames, followingUsernames, blockedUsernames);
      state.followers = followerUsernames;
      state.following = followingUsernames;
      state.blocked = blockedUsernames;
    },
    async updateUsers(state, users) {
      state.users = users;
    },
    async refreshUsers(state) {
      const url = '/api/users';
      const res = await fetch(url).then(async r => r.json());
      console.log('refresh', res);
      state.users = res;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
