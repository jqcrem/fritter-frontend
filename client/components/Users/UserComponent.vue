<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freet"
  >
    <header class="userheader">
      <h3 class="author">
        {{ user.name ?? '' }}
      </h3>
         <p 
        class="content"
      >
        &nbsp @{{ user.username }}
      </p>

    </header>
    <FriendButton :username="user.username" :button="buttonLabel" :actionType="actionType"/>
<!--     <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    /> -->
    <p class="info">
      Joined on {{ user.dateJoined }}
    </p>
  </article>
</template>

<script>
import FriendButton from '@/components/Friend/FriendButton.vue';

export default {
  name: 'UserComponent',
  props: {
    // Data from the stored freet
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    var buttonType = "FOLLOW";
    var buttonLabel = "Follow";
    if (this.$store.state.following.includes(this.user.username)){
      buttonType = "UNFOLLOW";
      buttonLabel = "Unfollow";
    }
    else if (this.$store.state.followers.includes(this.user.username)){
      buttonType = "BLOCK";
      buttonLabel = "Block";
    } else if (this.$store.state.blocked.includes(this.user.username)){
      buttonType = "UNBLOCK";
      buttonLabel = "Unblock";
    }
    // console.log(this.$store.state.following, this.user.username, buttonType);
    // console.log(this.$store.state.password);
    // console.log(this.$store.state.username);
    return {
      alerts: {}, // Displays success/error messages encountered during freet modification
      actionType: buttonType,
      buttonLabel: buttonLabel
    };
  },
  components: {
    FriendButton
  },
  methods: {
  }
};
</script>

<style scoped>
.freet {
    border: 1px solid #111;
    padding: 20px;
    position: relative;
}
.userheader {
  display:  flex;
  text-align:  end;
}
</style>
