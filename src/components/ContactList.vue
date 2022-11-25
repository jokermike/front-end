
<template>
 
 <h2 class="text-center mb-5">Liste des contacts enregistrés <span  v-if="data.length">({{ totalContacts }})</span></h2>
 <div v-if="data.length"  class="alert alert-primary col-md-6 offset-3" role="alert">
  Cochez les contact que vous voulez supprimer
</div>
  <div v-if="deleteItem.length" class="text-center mb-3">
    Suppression des {{ deleteItem.length }} élément (s) selectionnés
    <span><button class="btn btn-danger" @click.prevent="deleteContact()">Supprimer</button></span>
  </div>
  <div class="col-md-8 offset-2" v-if="data.length">
    <table class="table table-bordered" >
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Prénom(s)</th>
          <th scope="col">Téléphone</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in data" :key="contact['_id']">
          <th scope="row">
            <input
              type="checkbox"
              id="subscribeNews"
              name="subscribe"
              :value="contact['_id']"
              v-model="deleteItem"
            />
          </th>
          <td>{{ contact['nom'] }}</td>
          <td>{{ contact['prenom'] }}</td>
          <td>{{ contact['telephone'] }}</td>
          <td>{{ contact['email'] }}</td>
        </tr>
      </tbody>
    </table>
    
  </div>
  <p  class="text-center " v-else>Aucun contact enregistré pour l'instant</p>

</template>

<script>
import { ref,computed } from "vue";
import {useStore } from 'vuex'
import Swal from "sweetalert2";

export default {
  name: "ContactList",

  setup() {
    const store=useStore();
    const deleteItem = ref([]);
    const data=computed(()=>store.state.contacts);
    const totalContacts=computed(()=>store.getters.totalContacts)
const deleteContact=()=>{
  Swal.fire({
  title: 'Confirmation',
  text: "Voulez-vous supprimer les contacts selectionnés?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Supprimer',
  cancelButtonText:"Annuler"
}).then(async (result) => {
  if (result.isConfirmed) {
    
    await store.dispatch("deleteContacts",deleteItem.value).then(()=>{
      deleteItem.value=[]
      Swal.fire(
      'Opération réussie!',
      'Les contacts ont été supprimés',
      'success'
    )
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }
})
}
    return { data,totalContacts ,deleteItem,deleteContact};
  },
};
</script>