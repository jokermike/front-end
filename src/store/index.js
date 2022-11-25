import { createStore } from "vuex";
import axios from "axios";

const url = "http://localhost:3000/api/contact/";
const store = createStore({
  state: {
    contacts: [],
  },
  getters: {
    totalContacts(state) {
      return state.contacts.length;
    },
  },
  mutations: {
 
  },
  actions: {
    async getcontacts(context) {
      try {
        let response = await axios.get(url);

        context.state.contacts = response.data.data;
      } catch (err) {
        return err;
      }
    },

    async savecontact({ dispatch }, val) {
      try {
        let response = await axios.post(url + "add", val);
        if (response.status == 200) {
          dispatch("getcontacts");
        }
      } catch (err) {
        return {
          errors: err.response.data["errors"],
          message:err.response.data["message"],
          status:err.response.status,
          success: false,
        };
      }
    },

    async deleteContacts({dispatch},val){
      
        let response = await axios.post(url+"delete",val);
       
        if(response.status == 200){
            dispatch("getcontacts");
        }
    }
  
  },
});

export default store;
