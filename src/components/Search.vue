  
<template>
    <div>
        <input type="text" v-model="query" placeholder="Search by first name" v-on:keyup.enter="searchContact">
        <button @click="searchContact"><font-awesome-icon icon="search" /></button>
    </div>
</template>

<script>
export default {
    name: 'Search',
    props: ['placeholder'],
    data(){
        return{
            query: ''
        }
    },
    methods:{
        searchContact(){
            this.$emit("click", this.query)
            this.query = ''
        }
  } 
}
</script>

<style scoped>
input{border-radius: 10px; padding-left: 5px; outline:none; border: 0; width: 80%;}
button{cursor: pointer; background: none; border:0; padding-left: 5px; outline: none;}
</style>