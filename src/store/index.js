import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      contacts: [],
      secondaryList: [],
      openModalmain: false,
      openModalsecondary: false,
      action: '',
      contact: {}
  },
  mutations: {
        uploadContacts(state, contacts){
            state.contacts = contacts[0].data
        },
        addNewcontact(state, payload){
            if(payload.list === 'main'){
                //get an id for the new contact
                payload.contact.id = Date.now()
                //add new contact at correct list
                state.contacts = [ ...state.contacts, payload.contact ]
                //close modal component
                state.openModalmain = !state.openModalmain
            }else if(payload.list === 'secondary'){
                payload.contact.id = Date.now()
                state.secondaryList = [ ...state.secondaryList, payload.contact ]  
                state.openModalsecondary = !state.openModalsecondary  
            }
        },
        sortByFirstName(state, payload){
            if(payload.list === 'main'){
                state.contacts = state.contacts.sort((a, b) => a.first_name > b.first_name ? 1 :  b.first_name > a.first_name ? -1 : 0)   
            }else if(payload.list === 'secondary'){
                state.secondaryList = state.secondaryList.sort((a, b) => a.first_name > b.first_name ? 1 :  b.first_name > a.first_name ? -1 : 0)
            }
        },
        sortByLastName(state, payload){
            if(payload.list === 'main'){ 
                state.contacts = state.contacts.sort((a, b) => a.last_name > b.last_name ? 1 :  b.last_name > a.last_name ? -1 : 0)   
            }else if(payload.list === 'secondary'){
                state.secondaryList = state.secondaryList.sort((a, b) => a.last_name > b.last_name ? 1 :  b.last_name > a.last_name ? -1 : 0)
            }
        },
        sortByEmail(state, payload){
            if(payload.list === 'main'){
                state.contacts = state.contacts.sort((a, b) => a.email > b.email ? 1 :  b.email > a.email ? -1 : 0)
            }else if(payload.list === 'secondary'){
                state.secondaryList = state.secondaryList.sort((a, b) => a.email > b.email ? 1 :  b.email > a.email ? -1 : 0)
            }   
        },
        removeContact(state, payload){
            if(payload.list === 'main'){
                state.contacts = state.contacts.filter((item) => item.id !== payload.id)
            }else if(payload.list === 'secondary'){
                state.secondaryList = state.secondaryList.filter((item) => item.id !== payload.id)
            }
        },
        addContactToSecondaryList(state, payload){
            if(payload.list === 'main'){
                //find the contact by id
                let contact = state.contacts.find((item) => item.id === payload.id)
                //add the contact to the other list
                state.secondaryList = [ ...state.secondaryList, contact ]
                //delete the contact to the main list
                state.contacts = state.contacts.filter((item) => item.id !== payload.id)
            }else if(payload.list === 'secondary'){
                let contact = state.secondaryList.find((item) => item.id === payload.id)
                state.contacts = [ ...state.contacts, contact ]
                state.secondaryList = state.secondaryList.filter((item) => item.id !== payload.id)
            }
        },
        openModalForm(state, payload){
            //retrieve add or edit contact depends on the button clicked
            
            if(payload){
                if(payload.list === 'main'){
                    state.openModalmain = true
                }else if(payload.list === 'secondary'){
                    state.openModalsecondary = true
                }
                if(payload.action) {state.action = payload.action}
                if(payload.contact) {state.contact = payload.contact}
            }
        },
        closeModalForm(state, payload){
            if(payload.list === 'main'){
                state.openModalmain = !state.openModalmain
            }else if(payload.list === 'secondary'){
                state.openModalsecondary = !state.openModalsecondary
            }
        }

  },
  actions: {
        async getContacts({commit}){
            try {
                const response = await axios.get('data/contacts.json', { baseURL: window.location.Origin })
                commit('uploadContacts', response.data)
            } catch (error) {
                throw error.message
            }
        }
  }
})
