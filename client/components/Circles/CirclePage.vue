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
          <Button @click="addCircleNew">Add new circle</Button>
        </div>
      </header>
      <section v-if="circles.length">
        <CirclesList :circleData="circles" />
      </section>
      <section v-else>
       LOADING
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
  methods: {
    async addCircleNew() {
      var newCircle = await fetch('/api/circles/', {method: "POST", body: JSON.stringify({access: [], members: []})}).then(r => r.json());
      this.circles.push(newCircle.circle);
      console.log(newCircle.circle)
    }
  },
  async mounted() {
    //Populate the circles data
    var r = await fetch(`/api/circles/`).then(async r => r.json());
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
