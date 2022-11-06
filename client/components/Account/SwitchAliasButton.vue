<!-- Form for getting freets (all, from user) (inline style) -->

<script>
import ButtonForm from '@/components/common/ButtonForm.vue';

export default {
  name: 'SwitchAliasButton',
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
      default: 'Switch to Alias'
    },
  },
  methods: {
    async submit() {
      var userId = '';
      try {
        const logoutres = await fetch('api/users/session', {
          method: 'DELETE'
        });
        const res = await fetch('api/users/session', {
          method: 'POST', 
          body: JSON.stringify({username: this.username, password: this.$store.state.password}), 
          headers: {'Content-Type': 'application/json'}
        });
        const result = await res.json();
        console.log('USERID', result);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
      
    }
  }
};
</script>
