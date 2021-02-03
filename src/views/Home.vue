<template>
  <div class="main">
      <List title="Main list" :contacts="contacts" :list="main"/>
      <List title="Secondary list" :contacts="secondaryList" :list="secondary" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import List from '@/components/List.vue'

export default {
  name: 'Home',
  components: { List },
  computed: {
        ...mapState(['contacts', 'secondaryList'])
    },
    data(){
      return{
        main: 'main',
        secondary: 'secondary'
      }
    },
  created(){
      this.$store.dispatch('getContacts')
  }
}
</script>

<style>

.main{
    display: flex;
    justify-content: space-evenly;
    padding-top: 2rem;
    height: 90vh;
}

</style>
