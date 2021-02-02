import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVenus, faMars, faEdit, faTrashAlt, faUserPlus, faArrowsAltH, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faVenus, faMars, faEdit, faTrashAlt, faUserPlus, faArrowsAltH, faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)