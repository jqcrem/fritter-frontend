<!-- Default page that also displays users -->

<template>
  <main>
<!--     <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to create, edit, and delete users.
        </h3>
      </article>
    </section> -->
    <section>
      <header>
        <div class="left">
          <h2>
            Viewing all users
<!--             <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span> -->
          </h2>
        </div>
        <div class="right">
          <GetUsersForm
            ref="getUsersForm"
            value="author"
            button="Get All Users"
          />
          <GetFriendsByType 
            ref="getFriendsByType"
            button="People you're following"
            status="FOLLOWING"
          />
          <GetFriendsByType 
            ref="getFriendsByType"
            button="Your Followers"
            status="FOLLOWER"
          />
          <GetFriendsByType 
            ref="getFriendsByType"
            button="Blocked users"
            status="BLOCKED"
          />
        </div>
      </header>
      <section
        v-if="$store.state.users.length"
      >
        <UserComponent
          v-for="user in $store.state.users"
          :key="user._id"
          :user="user"
        />
      </section>
      <article
        v-else
      >
        <h3>No users found.</h3>
      </article>
    </section>
  </main>
</template>

<script>
import UserComponent from '@/components/Users/UserComponent.vue';
import GetUsersForm from '@/components/Users/GetUsersForm.vue';
import GetFriendsByType from '@/components/Users/GetFriendsByType.vue';

export default {
  name: 'UsersPage',
  components: {UserComponent, GetUsersForm, GetFriendsByType},
  mounted() {
    this.$refs.getUsersForm.submit();
  }
};
</script>

<style scoped>
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
