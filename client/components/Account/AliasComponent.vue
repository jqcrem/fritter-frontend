<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freet"
  >
    <header class="userheader">
      <h3 class="author">
        {{ alias.name ?? '' }}
      </h3>
         <p 
        class="content"
      >
        &nbsp @{{ alias.username }}
      </p>


    </header>
<!--     <textarea
      v-if="editing"
      class="content"
      :value="draft"
      @input="draft = $event.target.value"
    /> -->
    <p class="info">
      Joined on {{ alias.dateJoined }}
    </p>
    <SwitchAliasButton :username="alias.username" />
  </article>
</template>

<script>
import ButtonForm from '@/components/common/ButtonForm.vue';
import SwitchAliasButton from '@/components/Account/SwitchAliasButton.vue';

export default {
  name: 'AliasComponent',
  props: {
    // Data from the stored freet
    alias: {
      type: Object,
      required: true
    }
  },
  data() {
    console.log(this.alias);
    return {
      alerts: {}, // Displays success/error messages encountered during freet 
    };
  },
  components: {
    SwitchAliasButton
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
