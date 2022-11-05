<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import ButtonForm from '@/components/common/ButtonForm.vue';

export default {
  name: 'FriendButton',
  mixins: [ButtonForm],
  data() {
    return {value: this.$store.state.filter};
  },
  props: {
    username: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: 'Follow'
    },
    actionType: {
      type: String,
      default: 'FOLLOW'
    }
  },
  methods: {
    async submit() {
      var userId = '';
      try {
        const res = await fetch('api/users/username', {
          method: 'POST', 
          body: JSON.stringify({username: this.username}), 
          headers: {'Content-Type': 'application/json'}
        });
        const result = await res.json();
        userId = result.user.id;
        console.log('USERID', userId);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
      var url = '/api/friends/'; 
      var body = JSON.stringify({});
      var method = 'GET';
      var headers = {'Content-Type': 'application/json'};
      console.log('action Type', this.actionType);
      if (this.actionType == "FOLLOW"){
        url = '/api/friends/';
        body = JSON.stringify({userB: userId});
        method = 'POST';
      } else if (this.actionType == "UNFOLLOW") {
        url = `/api/friends/un/${userId}`;
        method = 'DELETE';
      } else if (this.actionType == "BLOCK") {
        url = `/api/friends/${userId}`;
        method = 'PUT';
      } else if (this.actionType == "UNBLOCK") {
        url = `/api/friends/un/${userId}`;
        method = 'PUT';
      }
      try {
        const r = await fetch(url, {method: method, body: body, headers: headers});
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$store.commit('updateUsers', res.users ?? []);
        this.$store.commit('refreshFriends');
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
