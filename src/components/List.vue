<template>
    <div class="list">
        <h1>{{title}}</h1>
        <Search @click="searchContact"/>
        <ul class="list__items" v-if="filteredContacts">
            <li v-for="contact in filteredContacts" :key="contact.id" class="list__item">
                <Contact :contact="contact" />          
            </li>
            <span v-if="filteredContacts.length === 0" class="list__result"> there aren't results for this name</span>
        </ul>

        <ul class="list__items">
            <div class="list__sort">
                <span>Sort by:</span>
                <span class="list__sort__title" @click="sortFirstName()">First Name</span>
                <span class="list__sort__title" @click="sortLastName()"> Last Name</span>
                <span class="list__sort__title" @click="sortEmail()">Email</span>
            </div>
            <li v-for="contact in contacts" :key="contact.id" class="list__item">
                <Contact :contact="contact" :list="list"/>          
            </li>
        </ul>
        <div v-if="list === 'main'">
            <FormModal v-if="openModalmain" :list="list"/>
        </div>
        <div v-if="list === 'secondary'">
            <FormModal v-if="openModalsecondary" :list="list"/>
        </div>
        
        <button class="item__button"><font-awesome-icon icon="user-plus" class="list__add-user" @click="modalForm()"/></button>
    </div>
</template>

<script>
import Contact from './Contact.vue'
import Search from './Search.vue'
import FormModal from './FormModal.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'List',
    props: [ 'title', 'contacts', 'list'],
    components: { Contact, Search, FormModal },
    data(){
        return {
            query: ''
        }
    },
    methods:{
        ...mapMutations(['sortByFirstName', 'sortByLastName', 'sortByEmail', 'openModalForm']),
        searchContact(query){
            this.query = query
        },
        modalForm(){
            let payload = {
                action: 'Add',
                list: this.list
            }
            this.openModalForm(payload)
        },
        sortFirstName(){
            let payload = {
                list: this.list
            }
            this.sortByFirstName(payload)
        },
        sortLastName(){
            let payload = {
                list: this.list
            }
            this.sortByLastName(payload)
        },
        sortEmail(){
            let payload = {
                list: this.list
            }
            this.sortByEmail(payload)
        }
    },
    computed: {
        //function to search contacts by a query without mutating state
        filteredContacts: function(){
            if(this.query != '') return this.contacts.filter(contact => contact.first_name.toLowerCase().match(this.query.toLowerCase()))
            else return undefined
        },
        ...mapState(['openModalmain', 'openModalsecondary'])
    }
}
</script>

<style scoped>

.list__items{
    list-style: none;
    overflow: auto;
    height: 90%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.list{
    border: 1px solid white;
    border-radius: 15%;
    width: 45%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
}

.list__item{
    width: 100%;
}

.list__sort{
    display: flex;
    width: 60%;
    justify-content: space-around;
    align-items: center;
    padding-bottom: .2rem;
}
.list__sort__title{
    border: 1px solid white;
    border-radius: 15px;
    padding: .4rem;
    cursor: pointer;

}

</style>