<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import ButtonForm from '@/components/common/ButtonForm.vue';

export default {
  name: 'GetFriendsByType',
  mixins: [ButtonForm],
  data() {
    return {value: this.$store.state.filter};
  },
  props: {
    status: {
      type: String,
      default: 'FOLLOWING'
    }
  },
  methods: {
    async submit() {
      // const url = '/api/user/userfriends/FOLLOWING'; 
      const url = `/api/users/userfriends/${this.status}`
      try {
        const r = await fetch(url, {method: "POST"});
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.$store.commit('updateFilter', this.value);
        console.log('res', res);
        console.log(this.$store.state.users);
        console.log('ok', this.button, this.status);
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
