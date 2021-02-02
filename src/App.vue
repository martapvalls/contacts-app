<template>
    <div id="app">
        <Header />
        <router-view/>
    </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
    name: 'App',
    components: { Header }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400&display=swap');

*{
    font-family: 'Nunito', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}
#app {
    background-image: linear-gradient(-225deg, #b7cee9 0%, #85b6ee 52%, #1870d4 100%);
    max-height: 100vh;
}
</style>
