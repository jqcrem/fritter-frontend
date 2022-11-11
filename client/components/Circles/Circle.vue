<!-- Default page that also displays users -->

<template>
  <section v-if="is_not_deleted" >
    <div class="circle">
            <button
        v-if="editing"
        @click="submitEdit"
      >
        ✅ Save changes
      </button>
      <button
        v-if="editing"
        @click="stopEditing"
      >
        🚫 Discard changes
      </button>
      <button
        v-if="!editing"
        @click="startEditing"
      >
        ✏️ Edit
      </button>
      <button @click="deleteCircle(circle)">
        🗑️ Delete
      </button>
          <modal :name="`modal-access-${this.circle._id}`" >
            <li v-for="alias in aliases">
          {{alias.username}}
          <button @click="addAlias(alias)">Add to circle access</button>
        </li>
    </modal>
    </div>
      <div class="circle">
          {{circle._id}} is Access to: <button v-if="editing" @click="openAccessModal">Edit access</button>
          <ul>
          <li v-for="access in circle.access" :something="watch">
            {{access.username}}
          </li>
        </ul>
        &nbsp
        Members of Circle <button v-if="editing" @click="openMembersModal">Edit members</button>
          <ul>
          <li v-for="member in circle.members">
            {{member.username}} <Button v-if="editing" @click="removeMember(member)">🗑️</Button>
          </li>
        </ul>
          <modal :name="`modal-members-${this.circle._id}`" >
                <li v-for="friend in friends">
          {{friend.userB.username}}
          <button @click="addFriend(friend.userB)">Add to circle</button>
        </li>
        </modal>
          &nbsp
          Circle owner:
          <ul>
          {{circle.authorId.username}}
        </ul>
      </div>
      <div class="right">
      </div>
  </section>
</template>
<!-- //Next up: make editCircle component -- more or less same as current, but can add and delete people (save button is what saves it). Make textbox for adding user (add by username)

 -->
<script>

export default {
  name: 'CircleComponent',
  props: {
    circle: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    //Populate the circles data
    console.log('aqui', this.circle);
  },
  data() {
    return {
      editing: false,
      modal_name: `modal-${this.circle._id}`,
      friends: [],
      aliases: [],
      watch: 0,
      is_not_deleted: true
    }
  },
  watch: {
    aliases() {
      this.aliases = this.aliases
      this.watch = this.watch + 1;
      console.log(this.aliases, this.watch);
  }},
  methods: {
    startEditing() {
      /**
       * Enables edit mode on this circle.
       */
      this.editing = true; // Keeps track of if a circle is being edited
      // this.draft = this.circle.content; // The content of our current "draft" while being edited
    },
    async stopEditing() {
      /**
       * Disables edit mode on this circle.
       */
      this.editing = false;
      let originalCircleFetch = await fetch(`/api/circles/${this.circle._id}`).then(r => r.json());
      let originalCircle = originalCircleFetch.result;
      this.aliases = originalCircle.access;
      console.log(this.aliases);
      console.log(originalCircle.access);
    },
    async submitEdit() {
      console.log(this.circle);
      let resultCircle = await fetch(`/api/circles/${this.circle._id}`, {method: "PUT", body: JSON.stringify({access: this.circle.access, members: this.circle.members})});

    },
    async deleteCircle(circle) {
      let deletion = await fetch(`/api/circles/${circle._id}`, {method: 'DELETE'}).then(r => r.json())
      console.log(deletion);
      this.is_not_deleted = false
    },
    addFriend(user) {
      this.circle.members.push(user);
    },
    addAlias(alias) {
      this.circle.access.push(alias);
    },
    removeMember(user) {
      this.circle.members = this.circle.members.filter(m => m != user);
    },
    async openMembersModal() {
      this.$modal.show(`modal-members-${this.circle._id}`);
      let friends = await fetch('/api/friends/FOLLOWER').then(r => r.json());
      console.log('friends', friends.response);
      let memberusernames = this.circle.members.map(m => m.username);
      this.friends = friends.response.filter(f => !memberusernames.includes(f.userB.username));
    },
    async openAccessModal() {
      this.$modal.show(`modal-access-${this.circle._id}`);
      let aliases = await fetch('/api/users/alias').then(r => r.json());
      console.log(aliases.aliases);
      let circlealiases = this.circle.access.map(a => a.username);
      this.aliases = aliases.aliases.filter(a => !circlealiases.includes(a.username));
      console.log(this.aliases);
    },
    updateAccess() {
    },
    updateMembers() {
    }
  }
};
</script>

<style scoped>
.circle {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}

section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
