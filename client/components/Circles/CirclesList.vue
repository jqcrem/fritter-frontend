<!-- Default page that also displays users -->

<template>
  <section v-if="circleData.length">
    <CircleComponent
      v-for="circle in circleData"
      :key="circle._id"
      :circle="circle"
    />  
  </section>
</template>

<script>
import CircleComponent from '@/components/Circles/Circle.vue';

export default {
  name: 'CirclesList',
  components: {CircleComponent},
  props: {
    circleData: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    //Populate the circles data
    console.log('here', this.circleData)
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
