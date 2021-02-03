<template>
    <div class="item">
        <div class="item__data">
            <span> First Name: <strong>{{contact.first_name}}</strong> </span>
            <span> Last Name: <strong>{{contact.last_name}}</strong> </span>
            <span> Email: <strong>{{contact.email}}</strong> </span>
            <span v-if="contact.gender === 'Female'"> <font-awesome-icon icon="venus"/> </span>
            <span v-if="contact.gender === 'Male'"> <font-awesome-icon icon="mars"/> </span>
        </div>
        <div class="item__buttons">
            <button class="item__button"> <font-awesome-icon icon="edit" @click="modalForm(contact)"/> </button>
            <button class="item__button"> <font-awesome-icon icon="trash-alt" @click="deleteContact(contact.id)"/> </button>
            <button class="item__button"> <font-awesome-icon icon="arrows-alt-h" @click="addContactToOtherList(contact.id)"/> </button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Contact',
    props: ['contact', 'list'],
    methods: {
        ...mapMutations(['removeContact', 'addContactToSecondaryList', 'openModalForm']),
        modalForm(contact){
            let payload = {
                action: 'Edit',
                contact: contact,
                list: this.list
            }
            this.openModalForm(payload)
        },
        addContactToOtherList(id){
            let payload = {
                list: this.list,
                id: id
            }
            this.addContactToSecondaryList(payload)
        },
        deleteContact(id){
            let payload = {
                list: this.list,
                id: id
            }
            this.removeContact(payload)
        }
    }
}
</script>

<style>

.item{
    display: flex;
    border: 1px solid white;
    border-radius: 15px;
    justify-content: space-between;
    padding: .2rem 2rem;
    margin: .2rem;
    background-color: rgb(175, 205, 250)

}
.item__data{
    display: flex;
    flex-direction: column;
}
.item__buttons{
    display: flex;
    justify-content: center;
    align-items: center;
}

.item__button{
    background-color: inherit;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: .4rem;
    outline: none;
    border-radius: 15%;
}

.item__button:hover{
    color:rgb(57, 122, 241);
    background-color:white;
}

</style>