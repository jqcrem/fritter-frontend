<!-- Default page that also displays users -->

<template>
  <section>
      <div class="circle">
        Access to:
          <ul>
          <li v-for="access in circle.access">
            {{access.username}}
          </li>
        </ul>
        &nbsp
        Members of Circle
          <ul>
          <li v-for="member in circle.members">
            {{member.username}}
          </li>
        </ul>
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

//Finally: add freet access reactivity based on permissions
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
