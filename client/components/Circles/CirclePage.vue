<!-- Default page that also displays users -->

<template>
  <main>
    <section>
      <header>
        <div class="left">
          <h2>
            All Circles
          </h2>
        </div>
        <div class="right">
        </div>
      </header>
      <section v-if="circles.length">
        <CirclesList :circleData="circles" />
      </section>
      <section v-else>
       HELLO
      </section>
    </section>
  </main>
</template>

<script>
import CirclesList from '@/components/Circles/CirclesList.vue';

export default {
  name: 'CirclePage',
  components: {CirclesList},
  data() {
    return {
      circles: []
    }
  },
  async mounted() {
    //Populate the circles data
    var r = await fetch('/api/circles/').then(async r => r.json());
    this.circles = r;
    console.log(this.circles);
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
