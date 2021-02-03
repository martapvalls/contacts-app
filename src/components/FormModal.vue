<template>
    <div class="modal__container">
        <form class="modal__form" @submit="newContact"> 
            <h1 class="modal__title" v-if="action === 'Add'">Add Contact</h1>
            <h1 class="modal__title" v-if="action === 'Edit'">Edit Contact</h1>
            <input v-if="action === 'Add'" v-model="first_name" @keyup.enter="newContact" type="text" placeholder="First Name" class="modal__input" required>
            <input v-if="action === 'Add'" v-model="last_name" @keyup.enter="newContact" type="text" placeholder="Last Name" class="modal__input" required>
            <input v-if="action === 'Add'" v-model="email" @keyup.enter="newContact" type="email" placeholder="Email" class="modal__input" required>
            <input v-if="action === 'Edit'" v-model="contact.first_name" @keyup.enter="editContact" type="text" placeholder="First Name" class="modal__input">
            <input v-if="action === 'Edit'" v-model="contact.last_name" @keyup.enter="editContact" type="text" placeholder="Last Name" class="modal__input">
            <input v-if="action === 'Edit'" v-model="contact.email" @keyup.enter="editContact" type="text" placeholder="Email" class="modal__input" >
            <div class="modal__gender" v-if="action === 'Add'">
                <input type="radio" value="Female" name="gender" v-model="gender" required>
                <label>Female</label>
                <input type="radio" value="Male" name="gender" v-model="gender">
                <label >Male</label>
            </div>
            <div class="modal__gender" v-if="action === 'Edit'">
                <input type="radio" value="Female" name="gender" v-model="contact.gender" required>
                <label >Female</label>
                <input type="radio" value="Male" name="gender" v-model="contact.gender">
                <label>Male</label>
            </div>
            <button type="submit" class="modal__button" v-if="action === 'Add'" > {{action}} </button>
            <button @click="onEdit" type="button" class="modal__button" v-if="action === 'Edit'" > {{action}} </button>
            <button @click="closeModal" type="button" class="modal__button" v-if="action === 'Add'"> Cancel </button>
        </form>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'FormModal',
    props: ['list'],
    data(){
        return{
            first_name: '',
            last_name: '',
            email: '',
            gender: ''
        }
    },
    methods: {
        ...mapMutations(['addNewcontact','openModalForm', 'closeModalForm']),
        newContact(event){
            event.preventDefault()
            console.log(this.list)
            let contact_ = {
                first_name: this.first_name.charAt(0).toUpperCase() + this.first_name.slice(1),
                last_name: this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1),
                gender: this.gender,
                email: this.email
            }

            let payload = {
                contact : contact_,
                list: this.list
            }
            this.addNewcontact(payload)
            this.openModalForm()
        },
        closeModal(){
            let payload = {
                list: this.list
            }
            this.closeModalForm(payload)
        },
        onEdit(){
            let payload = {
                list: this.list
            }
            this.closeModalForm(payload)
        }
    },
    computed: {
        ...mapState(['action', 'contact'])
    }
}
</script>

<style scoped>

  
.modal__container{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .4);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
}

.modal__form{
    margin-top: -100px;
    background: #FFFFFF;
    border: 1px solid rgba(5, 119, 196, 0.5);
    border-radius: 3px;
    width: 400px;
    height: 350px;
    padding: 30px;
    z-index: 20;
    box-shadow: 0 0 10px rgba(20, 118, 247, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.modal__title{
    width: 100%;
    text-align: center;
    margin: 0;
    border-bottom: 2px solid rgb(29, 135, 197);
}
.modal__gender{
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: inherit;
}
.modal__input{
    width: 60%;
    border: 1px solid  rgb(29, 135, 197);
}

.modal__button{
    width: 60%;
    border: 2px solid  rgb(29, 135, 197);
    padding: 2px;
    cursor: pointer;
}

.modal__button:hover{
    background-color: rgb(29, 135, 197);
    color: white;
}

</style>