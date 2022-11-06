<!-- Default page that also displays users -->

<template>
  <main>
    <section>
      <header>
        <div class="left">
          <h2>
            Aliases
<!--             <span v-if="$store.state.filter">
              by @{{ $store.state.filter }}
            </span> -->
          </h2>
        </div>
      </header>
      <section
        v-if="this.aliases.length"
      >
        <AliasComponent
          v-for="alias in this.aliases"
          :key="alias._id"
          :alias="alias"
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
import AliasComponent from '@/components/Account/AliasComponent.vue';

export default {
  name: 'AliasesComponent',
  components: {AliasComponent},
  data() {
    return {aliases: []};
  },
  async mounted() {
    const r = await fetch('/api/users/alias');
    const res = await r.json();
    this.aliases = res.aliases;
    // console.log('this aliases', this.aliases);
    // this.$refs.getUsersForm.submit();
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
