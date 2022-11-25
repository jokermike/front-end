<template>
 
  <h1 class="text-center">Contact App</h1>
  <ContactFormVue/>
  <ContactListVue/>
</template>

<script>
import ContactFormVue from './components/ContactForm.vue';
import ContactListVue from './components/ContactList.vue';
import {useStore } from 'vuex'
import { onMounted } from "vue";
export default {
  name: 'App',
  components: {
    ContactFormVue,ContactListVue
  },
  setup(){
    const store=useStore();

    onMounted(()=>{
      store.dispatch("getcontacts")
    })
  }
}
</script>

<style>

</style>
