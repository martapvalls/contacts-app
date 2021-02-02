import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = 'http://localhost:8080/data/contacts.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      contacts: [],
      secondaryList: [],
      openModal: false,
      action: '',
      contact: {}
  },
  mutations: {
        uploadContacts(state, contacts){
            state.contacts = contacts[0].data
        },
        addNewcontact(state, contact){
            contact.id = state.contacts.length +1
            state.contacts = [ ...state.contacts, contact ]
        },
        sortByFirstName(state, contacts){
            state.contacts = contacts.sort((a, b) => a.first_name > b.first_name ? 1 :  b.first_name > a.first_name ? -1 : 0)   
        },
        sortByLastName(state, contacts){
            state.contacts = contacts.sort((a, b) => a.last_name > b.last_name ? 1 :  b.last_name > a.last_name ? -1 : 0)   
        },
        sortByEmail(state, contacts){
            state.contacts = contacts.sort((a, b) => a.email > b.email ? 1 :  b.email > a.email ? -1 : 0)   
        },
        removeContact(state, id){
            state.contacts = state.contacts.filter((item) => item.id !== id)
        },
        addContactToSecondaryList(state, id){
            let contact = state.contacts.find((item) => item.id === id)
            state.secondaryList.push(contact)
        },
        openModalForm(state, payload){
            //open and close modal form
            state.openModal = !state.openModal
            //retrieve add or edit contact depends on the button clicked
            if(payload){
            state.action = payload.action
            if(payload.contact) {state.contact = payload.contact}
            }
        },

  },
  actions: {
        async getContacts({commit}){
            try {
                const response = await axios.get(url)
                commit('uploadContacts', response.data)
            } catch (error) {
                throw error.message
            }
        }
  }
})
