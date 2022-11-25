<template>
  <h3 class="text-center mt-3 text-sucess">Formulaire de création de contact</h3>
  <div v-if="error" class="col-md-6 offset-3 alert alert-danger" role="alert">
    <ul>
      <li v-for="er in error" :key="er">
        <p>{{ er["msg"] }}</p>
      </li>
    </ul>
  </div>
  <form class="mb-5 mt-5" @submit.prevent="save">
    <div class="col-md-6 offset-3">
      <div class="row">
        <div class="col-md-6 mb-5">
          <label for="lastname" class="form-label">Nom</label>
          <input
            v-model="form.nom"
            class="form-control"
            type="text"
            name="name"
            id="lastname"
            placeholder="Nom"
          />
        </div>
        <div class="col-md-6 mb-5">
          <label for="firstname" class="form-label">Prénom(s)</label>
          <input
            v-model="form.prenom"
            class="form-control"
            type="text"
            id="firstname"
            placeholder="Prénom"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="form.email"
            class="form-control"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div class="col-md-6 mb-5">
          <label for="phone" class="form-label">Téléphone</label>
          <input
            v-model="form.telephone"
            class="form-control"
            type="number"
            id="phone"
            placeholder="Téléphone"
          />
        </div>
      </div>

      <div class="d-grid gap-1">
        <button type="submit" class="btn btn-success">Créer le contact</button>
      </div>
    </div>
  </form>
</template>


<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
<script>
import { ref } from "vue";
import Form from "vform";
import { useStore } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "ContactForm",
  setup() {
    const store = useStore();
    const error = ref(null);

    let form = ref({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
    });

    const save = async () => {
      error.value = null;
      try {
        const result = await store.dispatch("savecontact", form.value);
        if (result) {
          if (result.status == 400) {
            error.value = result["errors"];
          } else if (result["status"] == 401) {
            error.value = [
              {
                msg: "un contact avec cet email existe deja",
              },
            ];
          }
        } else {
          form.value = new Form({});
          Swal.fire({
            icon: "success",
            title: "Contact enregistré avec succès",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    return { form, error, save };
  },
};
</script>

